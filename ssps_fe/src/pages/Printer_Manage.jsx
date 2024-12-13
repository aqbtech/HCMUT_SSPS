import React, { useState,useEffect } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest, {sendGetRequest} from '../API/fetchAPI';
import Modal from 'react-modal';
import printer_icon from '../assets/printer_icon.png';
import { toast } from 'react-toastify';

const Printer_Manage = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [configModalIsOpen, setConfigModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    description: '',
    campus: '',
    building: '',
    room: '',
    pageCapacity: '',
    remainingPage: '',
    remainingBlackInk: 'false',
    supportedPaperSize: 'A4'
  });
  const [printers, setPrinters] = useState([]);
  const [configData, setConfigData] = useState({
    defaultPagesPerSemester: 100,
    allowedFileTypes: ['pdf', 'docx'],
    defaultStartDateForPages: '2025-01-01'
  });

  useEffect(() => {
    fetchPrinters();
  }, []);
    // Fetch the list of printers from the backend
    const fetchPrinters = async () => {
      const response = await sendGetRequest(`/api/v1/spso/printer`);
      if (response && response.result) {
        setPrinters(response.result);
      }
    };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      remainingBlackInk: formData.remainingBlackInk === 'true',
      supportedPaperSize: [formData.supportedPaperSize]
    };
    try {
      const response = await sendRequest('POST', '/api/v1/spso/printer/add', payload);
      console.log(response);
      if (response.code === 200) {
        toast.success(response.result);
        fetchPrinters(); // Refresh the printer list after adding a new printer
        setFormData({
          // Reset the form after adding
          brand: '',
          name: '',
          description: '',
          campus: '',
          building: '',
          room: '',
          pageCapacity: '',
          remainingPage: '',
          remainingBlackInk: 'false',
          supportedPaperSize: 'A4'
        });
      } else {
        toast.error('Failed to add printer');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
    setModalIsOpen(false);
  };

  const handleConfigInputChange = (e) => {
    const { name, value } = e.target;
    setConfigData({
      ...configData,
      [name]: value
    });
  };

  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...configData,
      allowedFileTypes: typeof configData.allowedFileTypes === 'string'
        ? configData.allowedFileTypes.split(',')
        : configData.allowedFileTypes
    };
    try {
      const response = await sendRequest('POST', '/api/v1/spso/printer/config', payload);
      console.log(response);
      if (response.code === 200) {
        toast.success("Thay đổi cấu hình thành công.");
        // Additional logic if needed
      } else {
        toast.error('Failed to update config');
      }
    } catch (error) {
      toast.error('Error updating config');
      console.error('Error:', error);
    }
    setConfigModalIsOpen(false);
  };

  const handleChangeState = async (printerId, status) => {
    const payload = {
      printerId,
      status
    };
    try {
      const response = await sendRequest('PUT', '/api/v1/spso/printer/update_status', payload);
      console.log(response);
      if (response.code === 200) {
        toast.success(response.result);
        setPrinters(printers.map(printer =>
          printer.printerId === printerId ? { ...printer, status } : printer
        ));
      }
    } catch (error) {
      toast.error('Error updating printer status');
      console.error('Error:', error);
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <SPSOHeader />
        <div className="container mx-auto py-10 px-4 flex-1">
          <h1 className="text-2xl font-bold text-center mb-6">Quản Lý Máy In</h1>
          <div className="flex justify-between mb-6">
            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Thêm Máy In
            </button>

            <button
                onClick={() => setConfigModalIsOpen(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Thay Đổi Cấu Hình Máy In
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {printers.map((printer) => (
                <div
                    key={printer.printerId}
                    className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg"
                    onClick={() => setSelectedPrinter(printer)}
                >
                  <img
                      src={printer_icon}
                      alt="Printer"
                      className="w-16 h-16 mb-2"
                  />
                  <p className="font-bold">{printer.brand}</p>
                  <p className="text-gray-600 text-sm">{printer.model}</p>
                </div>
            ))}
          </div>
        </div>
        <Modal
            isOpen={!!selectedPrinter} // Open modal when a printer is selected
            onRequestClose={() => setSelectedPrinter(null)}
            contentLabel="Printer Details"
            className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-20"
        >
          {selectedPrinter && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {selectedPrinter.brand} {selectedPrinter.model}
                </h2>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {selectedPrinter.description}
                </p>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {selectedPrinter.location}
                </p>
                <p>
                  <span className="font-bold">Page Capacity:</span>{" "}
                  {selectedPrinter.pageCapacity}
                </p>
                <button
                  onClick={() =>
                    handleChangeState(
                      selectedPrinter.printerId,
                      selectedPrinter.status === "disabled" ? true : false
                    )
                  }
                  className={`${
                    selectedPrinter.status === "disabled"
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white font-bold py-2 px-4 rounded mt-4`}
                >
                  {selectedPrinter.status === "disabled" ? "Enable" : "Disable"}
                </button>
              </div>
          )}
        </Modal>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Add Printer"
            className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-20 overflow-auto"
            style={{ maxHeight: '90vh' }}
        >
          <h2 className="text-2xl font-bold mb-4">Thêm Máy In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                Loại Máy In
              </label>
              <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Tên Máy In
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Mô Tả
              </label>
              <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campus">
                Cơ sở
              </label>
              <input
                  type="text"
                  id="campus"
                  name="campus"
                  value={formData.campus}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="building">
                Tòa
              </label>
              <input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
                Phòng
              </label>
              <input
                  type="text"
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageCapacity">
                Số Trang
              </label>
              <input
                  type="number"
                  id="pageCapacity"
                  name="pageCapacity"
                  value={formData.pageCapacity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingPage">
                Số Trang Còn Lại
              </label>
              <input
                  type="number"
                  id="remainingPage"
                  name="remainingPage"
                  value={formData.remainingPage}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingBlackInk">
                Số Mực Đen Còn Lại
              </label>
              <select
                  id="remainingBlackInk"
                  name="remainingBlackInk"
                  value={formData.remainingBlackInk}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supportedPaperSize">
                Các Kiểu Trang
              </label>
              <select
                  id="supportedPaperSize"
                  name="supportedPaperSize"
                  value={formData.supportedPaperSize}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A5">A5</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Xác Nhận
              </button>
              <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy
              </button>
            </div>
          </form>
        </Modal>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Add Printer"
            className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-20 overflow-auto"
            style={{ maxHeight: '90vh' }}
        >
          <h2 className="text-2xl font-bold mb-4">Thêm Máy In</h2>
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                Loại Máy In
              </label>
              <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Tên Máy In
              </label>
              <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Mô Tả
              </label>
              <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campus">
                Cơ sở
              </label>
              <input
                  type="text"
                  id="campus"
                  name="campus"
                  value={formData.campus}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="building">
                Tòa
              </label>
              <input
                  type="text"
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
                Phòng
              </label>
              <input
                  type="text"
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageCapacity">
                Số Trang
              </label>
              <input
                  type="number"
                  id="pageCapacity"
                  name="pageCapacity"
                  value={formData.pageCapacity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingPage">
                Số Trang Còn Lại
              </label>
              <input
                  type="number"
                  id="remainingPage"
                  name="remainingPage"
                  value={formData.remainingPage}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingBlackInk">
                Số Mực Đen Còn Lại
              </label>
              <select
                  id="remainingBlackInk"
                  name="remainingBlackInk"
                  value={formData.remainingBlackInk}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supportedPaperSize">
                Các Kiểu Trang
              </label>
              <input
                  type="text"
                  id="supportedPaperSize"
                  name="supportedPaperSize"
                  value={formData.supportedPaperSize}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
              >
                Xác Nhận
              </button>
              <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy
              </button>
            </div>
          </form>
        </Modal>
        <Modal
            isOpen={configModalIsOpen}
            onRequestClose={() => setConfigModalIsOpen(false)}
            contentLabel="Change Config"
            className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-20 overflow-auto"
            style={{ maxHeight: '90vh' }}
        >
          <h2 className="text-2xl font-bold mb-4">Thay Đổi Cấu Hình Máy In</h2>
          <form onSubmit={handleConfigSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="defaultPagesPerSemester">
                Số Trang Mặc Định Trong Một Học Kỳ
              </label>
              <input
                  type="number"
                  id="defaultPagesPerSemester"
                  name="defaultPagesPerSemester"
                  value={configData.defaultPagesPerSemester}
                  onChange={handleConfigInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allowedFileTypes">
                Các Loại File Hỗ Trợ
              </label>
              <input
                  type="text"
                  id="allowedFileTypes"
                  name="allowedFileTypes"
                  value={configData.allowedFileTypes}
                  onChange={handleConfigInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter file types separated by commas (e.g., pdf,docx)"
                  required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="defaultStartDateForPages">
                Ngày Cài Lại Số Trang Mặc Định
              </label>
              <input
                  type="date"
                  id="defaultStartDateForPages"
                  name="defaultStartDateForPages"
                  value={configData.defaultStartDateForPages}
                  onChange={handleConfigInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Xác Nhận
              </button>
              <button
                  type="button"
                  onClick={() => setConfigModalIsOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy
              </button>
            </div>
          </form>
        </Modal>
      </div>
  );
};

export default Printer_Manage;