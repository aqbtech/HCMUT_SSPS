import React, { useState, useEffect } from 'react';
import StudentHeader from '../component/StudentHeader';
import sendRequest, {sendGetRequest} from '../API/fetchAPI';
import Cookies from "js-cookie";
import file_icon from '../assets/file_icon.png';
import ErrorForm from '../component/errorForm';
import {toast} from "react-toastify";

const Print = () => {
  const [docs, setDocs] = useState([]);
  const [errorMess, setErrorMess] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [printOptions, setPrintOptions] = useState({
    printDeviceId: '',
    paperSize: 'A4',
    numberOfCopies: 1,
    pageRange: 'all',
    min: null,
    max: null,
    pageType: 'single',
    layout: 'portrait',
  });
  // useEffect(()=> {
  //   const token = Cookies.get("TOKEN");
  //   if(!token) window.location.href = "http://localhost:8081/sso/login";
  // })
  // Thêm state để lưu số trang của tài liệu
  const [docTotalPages, setDocTotalPages] = useState(1);
  const [listDevices, setListDevices] = useState([]);
  // Thêm các state để quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch tài liệu khi trang được load
  useEffect(() => {
    const fetchDocs = async () => {
      // const result = await sendGetRequest(`/api/v1/document/all-documents?page=${currentPage - 1}&size=${itemsPerPage}`);
      const result = await sendRequest('GET', `/api/v1/document/all-documents?page=${currentPage - 1}&size=${itemsPerPage}`);
      if (result) {
        setDocs(result.content || []);
        setTotalPages(result.page.totalPages); // Cập nhật tổng số trang từ API
      } else {
        setDocs([]);
      }
    };

    fetchDocs();
  }, [currentPage, itemsPerPage]); // fetch lại khi trang thay đổi

  // Fetch danh sách thiết bị in khi component mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await sendGetRequest('/api/v1/print-device/all');
        console.log("Thiet bi may in:", response)
        if (response.result) {
          setListDevices(response.result); // Giả sử response trả về là danh sách thiết bị
        }
      } catch (err){
        toast.error("Lay thiet bi that bai");
        throw err;
      }


    };
    fetchDevices();
  }, []);



  // Xử lý mở modal với tài liệu được chọn và lấy số trang của tài liệu
  const handlePrintClick = async (docId) => {
    setSelectedDocId(docId);

    // Lấy số trang của tài liệu từ API
    const path = `/api/v1/document/page-count?docid=${docId}`;
    const docResult = await sendRequest('GET',`/api/v1/document/page-count?docid=${docId}`);
    console.log("So trang tai lieu la:", docResult);
    setModalOpen(true);
    setDocTotalPages(docResult);
  };

  // Gửi yêu cầu in
  const handlePrintSubmit = async () => {
    if (!selectedDocId) return errorMessage('No document selected.');
    const payload = {
      docsId: selectedDocId,
      ...printOptions,
    };
    console.log("Payload:", payload);
    if(!printOptions.printDeviceId){
      toast.error("Vui lòng chọn máy in!")
      return;
    }
    try {
      const result = await sendRequest('POST', '/api/v1/print/create', payload);
      if(result === "NOT_ENOUGH_BALANCE"){
        toast.error("Lượng giấy còn lại của bạn không đủ để thực hiện yêu cầu in!")
        return;
      }
      else if(result === "NOT_ENOUGH_INK"){
        toast.error("Máy in không đủ mực!")
        return;
      }
      else if(result === "NOT_ENOUGH_PAPER") {
        toast.error("Lượng giấy còn lại của máy in không đủ để thực hiện yêu cầu in!")
        return;
      }
      console.log("Ket qua in:", result);
      toast.success("In thành công!");
      setModalOpen(false);
    } catch (err){
        if(err === "NOT_ENOUGH_BALANCE"){
          toast.error("Lượng giấy còn lại của bạn không đủ để thực hiện yêu cầu in!")
          return;
        }
        else if(err=== "NOT_ENOUGH_INK"){
          toast.error("Máy in không đủ mực!")
          return;
        }
        else if(err === "NOT_ENOUGH_PAPER") {
          toast.error("Lượng giấy còn lại của máy in không đủ để thực hiện yêu cầu in!")
          return;
        }
        console.log("Loi khi in: ", err);
        toast.error("Loi khi in");
        return;
    }
  };

  // Hàm phân trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <StudentHeader />
      <div className="container mx-auto py-10 px-4 flex-1">
        <h1 className="text-2xl font-bold text-center mb-6">In tài liệu</h1>

        {/* Document List */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left"></th>
                <th className="px-4 py-2 text-left">STT</th>
                <th className="px-4 py-2 text-left">Tên tài liệu</th>
                <th className="px-4 py-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={doc.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-2 flex items-center"> 
                    <img src={file_icon} alt="File" className="w-5 h-5 mr-2" /> 
                  </td>
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2">{doc.name}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handlePrintClick(doc.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      In
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Trang trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Trang sau
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-full overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tùy chọn in</h2>

              {/* Chọn thiết bị in */}
              <div className="mb-4">
                <label className="block font-bold mb-2">Máy in</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.printDeviceId}
                    onChange={(e) =>
                        setPrintOptions({...printOptions, printDeviceId: e.target.value})
                    }
                >
                  <option value="">Chọn máy in</option>
                  {listDevices
                      .filter((device) => device.description === "enabled") // Chỉ hiển thị thiết bị enabled
                      .map((device) => (
                          <option key={device.printerId} value={device.printerId}>
                            {device.brand} {device.model} ({device.location})
                          </option>
                      ))}
                </select>
              </div>

              {/* Kích thước giấy */}
              <div className="mb-4">
                <label className="block font-bold mb-2">Khổ giấy</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.paperSize}
                    onChange={(e) =>
                        setPrintOptions({...printOptions, paperSize: e.target.value})
                    }
                >
                  <option value="" disabled>Chọn khổ giấy</option>
                  {listDevices
                      .find((device) => device.printerId === printOptions.printDeviceId)?.supportedPaperSize.map(
                          (size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                          )
                      )}
                </select>
              </div>

              {/* Số lượng bản in */}
              <div className="mb-4">
                <label className="block font-bold mb-2">Số bản in</label>
                <input
                    type="number"
                    min="1"
                    max="2147483647"
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.numberOfCopies}
                    onChange={(e) => {
                      if (e.target.value < 1) e.target.value = 1
                      if (e.target.value > 2147483647) e.target.value = 2147483647
                      setPrintOptions({...printOptions, numberOfCopies: e.target.value})
                    }

                    }
                />
              </div>

              {/* Chọn page range */}
              <div className="mb-4">
                <label className="block font-bold mb-2">Trang in</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.pageRange}
                    onChange={(e) => setPrintOptions({ ...printOptions, pageRange: e.target.value })}
                >
                  <option value="all">all</option>
                  <option value="even">even</option>
                  <option value="odd">odd</option>
                  <option value="custom">custom</option>
                </select>
              </div>

              {/* Custom page range input */}
              {printOptions.pageRange === 'custom' && (
                  <div className="mb-4">
                    <label className="block font-bold mb-2">Trang in(custom)</label>
                    <div className="flex space-x-2">
                      {/* Start Page */}
                      <input
                          type="number"
                          className="w-full border px-3 py-2 rounded"
                          placeholder="Start Page"
                          value={printOptions.min || ''}
                          min="1"
                          onChange={(e) => {
                            let value = parseInt(e.target.value, 10);

                            // Đảm bảo giá trị không nhỏ hơn 1 và không lớn hơn số trang tối đa
                            if (value < 1) value = 1;
                            if (value > docTotalPages) value = docTotalPages;

                            // Kiểm tra nếu lớn hơn End Page, đặt lại giá trị End Page
                            if (printOptions.max && value > printOptions.max) {
                              setPrintOptions({ ...printOptions, min: value, max: value });
                            } else {
                              setPrintOptions({ ...printOptions, min: value });
                            }
                          }}
                      />

                      {/* End Page */}
                      <input
                          type="number"
                          className="w-full border px-3 py-2 rounded"
                          placeholder="End Page"
                          value={printOptions.max || ''}
                          min="1"
                          onChange={(e) => {
                            let value = parseInt(e.target.value, 10);

                            // Đảm bảo giá trị không nhỏ hơn 1 và không lớn hơn số trang tối đa
                            if (value < 1) value = 1;
                            if (value > docTotalPages) value = docTotalPages;

                            // Kiểm tra nếu nhỏ hơn Start Page, đặt lại giá trị Start Page
                            if (printOptions.min && value < printOptions.min) {
                              setPrintOptions({ ...printOptions, min: value, max: value });
                            } else {
                              setPrintOptions({ ...printOptions, max: value });
                            }
                          }}
                      />
                    </div>
                  </div>
              )}


              {/* Các tùy chọn in khác */}
              <div className="mb-4">
                <label className="block font-bold mb-2">Loại trang</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.pageType}
                    onChange={(e) =>
                        setPrintOptions({...printOptions, pageType: e.target.value})
                    }
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-bold mb-2">Bố cục</label>
                <select
                    className="w-full border px-3 py-2 rounded"
                    value={printOptions.layout}
                    onChange={(e) =>
                        setPrintOptions({...printOptions, layout: e.target.value})
                    }
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end">
                <button
                    onClick={handlePrintSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xác nhận
                </button>
                <button
                    onClick={() => setModalOpen(false)}
                    className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Print;
