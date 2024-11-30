import React, { useState, useEffect } from 'react';
import StudentHeader from '../component/StudentHeader';
import sendRequest, { sendGetRequest } from '../API/fetchAPI';
import Cookies from "js-cookie";

const Print = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [printOptions, setPrintOptions] = useState({
    printDeviceId: '',
    paperSize: 'A4',
    numberOfCopies: 1,
    pageRange: 'all',
    pageType: 'single',
    layout: 'portrait',
  });
  useEffect(()=> {
    const token = Cookies.get("TOKEN");
    if(!token) window.location.href = "http://localhost:8081/sso/login";
  })
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
        setTotalPages(result.totalPages); // Cập nhật tổng số trang từ API
      } else {
        setDocs([]);
      }
    };

    fetchDocs();
  }, [currentPage, itemsPerPage]); // fetch lại khi trang thay đổi

  // Fetch danh sách thiết bị in khi component mount
  useEffect(() => {
    const fetchDevices = async () => {
      const response = await sendGetRequest('/api/v1/print-device/all');
      console.log("Thiet bi may in:", response)
      if (response.result) {
        setListDevices(response.result); // Giả sử response trả về là danh sách thiết bị
      }
    };
    fetchDevices();
  }, []);

  // Xử lý mở modal với tài liệu được chọn và lấy số trang của tài liệu
  const handlePrintClick = async (docId) => {
    setSelectedDocId(docId);
    setModalOpen(true);

    // Lấy số trang của tài liệu từ API
    const path = `/api/v1/document/page-count?docid=${docId}`;
    const docResult = await sendRequest('GET',`api/v1/document/page-count?docid=${docId}`);
    console.log("So trang tai lieu la:", docResult);
    if (docResult && docResult.result) {
      setDocTotalPages(docResult.result);
    }
  };

  // Gửi yêu cầu in
  const handlePrintSubmit = async () => {
    if (!selectedDocId) return alert('No document selected.');
    const payload = {
      docsId: selectedDocId,
      ...printOptions,
    };
    console.log("Payload:", payload);
    const result = await sendRequest('POST', '/api/v1/print/create', payload, {
      'Content-Type': 'application/json',
    });
    console.log("Ket qua in:", result);
    if (result === 'PRINTED') {
      alert('Document sent to printer successfully!');
      setModalOpen(false);
    } else {
      alert('Failed to print document, code:' + result);
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
        <h1 className="text-2xl font-bold text-center mb-6">Print Documents</h1>

        {/* Document List */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={doc.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2">{doc.name}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handlePrintClick(doc.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Print
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
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Print Options</h2>
             {/* Chọn thiết bị in */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Print Device ID</label>
              <select
                  className="w-full border px-3 py-2 rounded"
                  value={printOptions.printDeviceId}
                  onChange={(e) =>
                      setPrintOptions({...printOptions, printDeviceId: e.target.value})
                  }
              >
                <option value="">Select a device</option>
                {listDevices.map((device) => (
                    <option key={device.printerId} value={device.printerId}>
                      {device.brand} {device.model} - {device.description}
                    </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Paper Size</label>
              <select
                  className="w-full border px-3 py-2 rounded"
                  value={printOptions.paperSize}
                  onChange={(e) =>
                      setPrintOptions({...printOptions, paperSize: e.target.value})
                  }
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Number of Copies</label>
              <input
                type="number"
                min="1"
                className="w-full border px-3 py-2 rounded"
                value={printOptions.numberOfCopies}
                onChange={(e) =>
                  setPrintOptions({ ...printOptions, numberOfCopies: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Page Range</label>
              <select
                className="w-full border px-3 py-2 rounded mb-2"
                value={printOptions.pageRangeType || 'all'}
                onChange={(e) =>
                  setPrintOptions({ ...printOptions, pageRangeType: e.target.value})
                }
              >
                <option value="all">Full</option>
                <option value="odd">Odd</option>
                <option value="even">Even</option>
                <option value="custom">Custom</option>
              </select>

              {printOptions.pageRangeType === 'custom' && (
                <input
                  type="text"
                  placeholder={`e.g., 1-${docTotalPages}`}
                  className="w-full border px-3 py-2 rounded"
                  value={printOptions.pageRange}
                  onChange={(e) =>
                    setPrintOptions({ ...printOptions, pageRange: e.target.value })
                  }
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Page Type</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={printOptions.pageType}
                onChange={(e) =>
                  setPrintOptions({ ...printOptions, pageType: e.target.value })
                }
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Layout</label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={printOptions.layout}
                onChange={(e) =>
                  setPrintOptions({ ...printOptions, layout: e.target.value })
                }
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePrintSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Print
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Print;
