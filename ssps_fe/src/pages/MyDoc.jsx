import React, { useState, useEffect, useCallback } from 'react';
import StudentHeader from '../component/StudentHeader';
import sendRequest, { sendGetRequest } from '../API/fetchAPI';
import Cookies from 'js-cookie';
import { useDropzone } from 'react-dropzone';
import file_icon from '../assets/file_icon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyDoc = () => {
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [file, setFile] = useState(null);
  // useEffect(()=> {
  //   const token = Cookies.get("TOKEN");
  //   if(!token) window.location.href = "http://localhost:8081/sso/login";
  // })
  const fetchDocs = async (page = 0, size = 10) => {
    try {
      const result = await sendGetRequest('/api/v1/document/all-documents', { page, size });
      console.log(result)
      if (result) {
        setDocs(result.content);
        setPage(result.page.number);
        setSize(result.page.size);
        setTotalPages(result.page.totalPages);
      } else {
        setDocs([]);
      }
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (docId) => {
    const result = await sendRequest('DELETE', `/api/v1/document/delete?id=${docId}`, null);
    if (result) {
      setDocs(docs.filter((doc) => doc.id !== docId));
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Vui lòng chọn tệp để tải lên');

    const formData = new FormData();
    formData.append('file', file);

    const token = Cookies.get("TOKEN");
    const response = await fetch('http://localhost:8080/api/v1/document/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Nếu server yêu cầu token xác thực
      },
      body: formData, // Gửi trực tiếp formData
    });
    console.log(response);

    if (response.ok) {
      // alert('Upload thành công!');
      setFile(null); // Reset file sau khi upload
      fetchDocs(page, size); // Gọi lại danh sách tài liệu với trang hiện tại
      toast.success("Tải tài liệu lên thành công")
    } else {
      toast.error("Tải tài liệu lên thất bại")
      console.error('Tải tài liệu lên thất bại', await response.text());
      // alert('Upload thất bại!');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchDocs(newPage, size);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
      <div className="flex flex-col min-h-screen">
        <StudentHeader />
            <div className="container mx-auto flex-grow py-10 px-4">
              <h1 className="text-2xl font-bold text-center mb-6">Tài liệu của bạn</h1>

              {/* File Upload Section */}
              <div className="mb-8 flex items-center justify-center gap-4">
                <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded p-4 w-full max-w-xs ${
                isDragActive ? 'border-blue-600' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-600">Drop the files here ...</p>
            ) : file ? (
              <div className="flex flex-col items-center">
                <img icon={file_icon} size="3x" className="text-gray-600 mb-2" />
                <p className="text-gray-600">{file.name}</p>
              </div>
            ) : (
              <p className="text-gray-600">Tải tài liệu ở đây</p>
            )}
            </div>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Xác nhận
            </button>
          </div>

          {/* Document List */}
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="table-auto w-full">
              <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">STT</th>
                <th className="px-4 py-2 text-left">Tên tài liệu</th>
                <th className="px-4 py-2 text-center"></th>
              </tr>
              </thead>
              <tbody>
              {docs.map((doc, index) => (
                  <tr key={doc.id} className="odd:bg-gray-50 even:bg-white">
                    <td className="px-4 py-2">{index + 1 + page * size}</td>
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                          onClick={() => handleDelete(doc.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
              ))}
              {docs.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Hiện chưa có tài liệu nào!
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className={`px-4 py-2 rounded ${
                    page === 0
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Trang trước
            </button>
            <span>
            Trang {page + 1} / {totalPages}
          </span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page + 1 >= totalPages}
                className={`px-4 py-2 rounded ${
                    page + 1 >= totalPages
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>
  );
};

export default MyDoc;
