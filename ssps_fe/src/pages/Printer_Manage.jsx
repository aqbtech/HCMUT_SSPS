import React, { useState,useEffect } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest, {sendGetRequest} from '../API/fetchAPI';
import Modal from 'react-modal';
import Cookies from "js-cookie";
import { sendRefreshRequest } from '../API/fetchAPI';

const Printer_Manage = () => {
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

  const refreshToken = Cookies.get('TOKEN');
  console.log(sendRefreshRequest(refreshToken)); //

  const [printers, setPrinters] = useState([]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const token = Cookies.get("TOKEN");
  //     if (!token) window.location.href = "http://localhost:8081/sso/login";
  //   }, 3000); // Delay of 3 seconds

  //   return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
  // }, []);
  // Fetch dữ liệu từ API
  const [notification, setNotification] = useState(null);
  const [configData, setConfigData] = useState({
    defaultPagesPerSemester: 100,
    allowedFileTypes: ['pdf', 'docx'],
    defaultStartDateForPages: '2025-01-01'
  });

    // Fetch the list of printers from the backend
    const fetchPrinters = async () => {
      const response = await sendGetRequest('/api/v1/spso/printer', 'GET');
      if (response && response.result) {
        setPrinters(response.result);
      }
    };
    fetchPrinters();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      remainingBlackInk: formData.remainingBlackInk === 'true',
      supportedPaperSize: [formData.supportedPaperSize]
    };
    sendRequest('POST', `/api/v1/spso/printer/add`, payload)
      .then(response => {
        console.log(response);
        if (response.code === 200) {
          setNotification('Thêm máy in thành công');
          setTimeout(() => setNotification(null), 2000);
          fetchPrinters();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setModalIsOpen(false);
  };

  const handleConfigInputChange = (e) => {
    const { name, value } = e.target;
    setConfigData({
      ...configData,
      [name]: value
    });
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...configData,
      allowedFileTypes: typeof configData.allowedFileTypes === 'string'

        ? configData.allowedFileTypes.split(',')

        : configData.allowedFileTypes


    };
    sendRequest('POST', '/api/v1/spso/printer/config', payload)
      .then(response => {
        console.log(response);
        if (response.code === 200) {
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setConfigModalIsOpen(false);
  };

  const handleChangeState = (printerId, currentStatus) => {
  const newStatus = currentStatus !== 'enabled';

  const payload = {
    printerId,
    newStatus
  };

  sendRequest('PUT', '/api/v1/spso/printer/update_status', payload)
    .then(response => {
      console.log(response);
      if (response.code === 200) {
        // Refresh the printer list after changing the state
        setPrinters(printers.map(printer => 
          printer.printerId === printerId ? { ...printer, newStatus} : printer
        ));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <SPSOHeader />
      <div className="container mx-auto py-10 px-4 flex-1">
        <h1 className="text-2xl font-bold text-center mb-6">Printer Manage</h1>
        <div className="flex justify-between mb-6">
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Printer
        </button>

        <button
            onClick={() => setConfigModalIsOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Change Config
          </button>
        </div>

        <div className="overflow-auto mt-5">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Brand</th>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Page Capacity</th>
                <th className="py-2 px-4 border-b">Remaining Page</th>
                <th className="py-2 px-4 border-b">Remaining Black Ink</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Supported Paper Size</th>
              </tr>
            </thead>
            <tbody>
              {printers.map((printer) => (
                <tr key={printer.printerId}>
                  <td className="py-2 px-4 border-b">{printer.brand}</td>
                  <td className="py-2 px-4 border-b">{printer.model}</td>
                  <td className="py-2 px-4 border-b">{printer.description}</td>
                  <td className="py-2 px-4 border-b">{printer.pageCapacity}</td>
                  <td className="py-2 px-4 border-b">{printer.remainingPage}</td>
                  <td className="py-2 px-4 border-b">{printer.remainingBlackInk ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4 border-b">{printer.location}</td>
                  <td className="py-2 px-4 border-b">{printer.supportedPaperSize.join(', ')}</td>
                  <td className="py-2 px-4 border-b">

                    <button
                    onClick={() => handleChangeState(printer.printerId, printer.status)}
                    className={`${
                    printer.status === 'enabled' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                    } text-white font-bold py-1 px-2 rounded`}
                    >
                    {printer.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Printer"
        className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-20 overflow-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-2xl font-bold mb-4">Add Printer</h2>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
              Brand
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
              Name
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
              Description
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
              Campus
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
              Building
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
              Room
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
              Page Capacity
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
              Remaining Page
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
              Remaining Black Ink
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
              Supported Paper Size
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
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
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
        <h2 className="text-2xl font-bold mb-4">Change Config</h2>
        <form onSubmit={handleConfigSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="defaultPagesPerSemester">
              Default Pages Per Semester
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
              Allowed File Types
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
              Default Start Date For Pages
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
              Submit
            </button>
            <button
              type="button"
              onClick={() => setConfigModalIsOpen(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Printer_Manage;