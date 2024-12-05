import React, { useEffect, useState } from 'react';
import StudentHeader from '../component/StudentHeader';
import sendGetRequest from '../API/fetchAPI';
import Cookies from "js-cookie";

const History = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect để kiểm tra token (nếu cần thiết)
  useEffect(() => {
    const token = Cookies.get("TOKEN");
    if (!token) {
      window.alert("Vui lòng đăng nhập để sử dụng dịch vụ!");
      window.location.href = "http://localhost:8081/sso/login";
    }
  }, []);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchHistory = async () => {
      const result = await sendGetRequest('GET', `/api/v1/log/log?page=${page}&size=10`);

      if (result) {
        setHistory(result.content);
        setTotalPages(result.page.totalPages);
      }
      console.log(result);
    };

    fetchHistory();
  }, [page]);

  // Chuyển đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <StudentHeader />
      </header>
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Lịch Sử In</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">STT</th>
                <th className="border border-gray-300 px-4 py-2">Thời gian</th>
                <th className="border border-gray-300 px-4 py-2">Tên tài liệu</th>
                <th className="border border-gray-300 px-4 py-2">Máy in</th>
                <th className="border border-gray-300 px-4 py-2">Vị trí</th>
                <th className="border border-gray-300 px-3 py-2">Khổ giấy</th>
                <th className="border border-gray-300 px-3 py-2">Số bản in</th>
                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                <th className="border border-gray-300 px-4 py-2">Tổng số trang(A4)</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((log, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{index + 1 + page * 10}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(log.date).toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{log.fileName}</td>
                    <td className="border border-gray-300 px-4 py-2">{log.printer}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {log.location.campus}, {log.location.building}, {log.location.room}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{log.pageType}</td>
                    <td className="border border-gray-300 px-4 py-2">{log.numberOfCopy}</td>
                    <td className="border border-gray-300 px-4 py-2">{log.status}</td>
                    <td className="border border-gray-300 px-4 py-2">{log.cost}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Bạn chưa có in lần nào hết!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
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
              Previous
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
              Next
            </button>
          </div>
    </div>
</main>
</div>
)
  ;
};

export default History;
