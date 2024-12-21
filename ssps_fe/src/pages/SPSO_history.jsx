import React, { useState, useEffect } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest, {sendGetRequest} from '../API/fetchAPI';

const SPSOHistory = () => {
  const [history, setHistory] = useState([]);
  const [printerId, setPrinterId] = useState('');
  const [date, setDate] = useState('');
  // useEffect(()=> {
  //   const token = Cookies.get("TOKEN");
  //   if(!token) window.location.href = "http://localhost:8081/sso/login";
  // })
  // Fetch dữ liệu từ API



  const handleInputChange = (e) => {
    setPrinterId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendGetRequest(`/api/v1/spso/printerjob/printer/${printerId}`);
    if (response && response.code === 200) {
      setHistory(response.result);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    const response = await sendGetRequest(`/api/v1/spso/printerjob/date/${date}`);
    if (response && response.code === 200) {
      setHistory(response.result);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await sendGetRequest(`/api/v1/spso/printerjob`); // Fetch all history initially
      if (response && response.code === 200) {
        setHistory(response.result);
      }
    };
    fetchHistory();
  }, []);

  return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <SPSOHeader />
        <div className="container mx-auto py-10 px-4 flex-1">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Lịch Sử Máy In</h1>

          {/* Form tìm kiếm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
              <div className="flex flex-col md:flex-row md:items-center">
                <label htmlFor="printerId" className="mr-2 mb-2 md:mb-0">ID Máy In:</label>
                <input
                    type="text"
                    id="printerId"
                    name="printerId"
                    value={printerId}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  
 flex-grow"
                    placeholder="Nhập ID Máy In"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0 ml-0 md:ml-2"
                >
                  Tìm Kiếm
                </button>
              </div>
            </form>

            <form onSubmit={handleDateSubmit} className="bg-white p-4 rounded-md shadow-md">
              <div className="flex flex-col md:flex-row md:items-center">
                <label htmlFor="date" className="mr-2 mb-2 md:mb-0">Ngày:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  
 flex-grow"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0 ml-0 md:ml-2"
                >
                  Tìm Kiếm
                </button>
              </div>
            </form>
          </div>

          {/* Lịch sử in */}
          <div className="bg-white p-6 rounded-md shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch Sử In</h2>
            {history.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Sinh Viên</th>
                    <th className="py-2 px-4 border-b text-left">Máy In</th>
                    <th className="py-2 px-4 border-b text-left">Tên Tệp</th>
                    <th className="py-2 px-4 border-b text-left">Số trang tài liệu</th>
                    <th className="py-2 px-4 border-b text-left">Khổ Giấy</th>
                    <th className="py-2 px-4 border-b text-left">Thời Gian Bắt Đầu</th>
                    <th className="py-2 px-4 border-b text-left">Thời Gian Kết Thúc</th>
                  </tr>
                  </thead>
                  <tbody>
                  {history.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4">{item.studentResponse.username}</td>
                        <td className="py-2 px-4">{item.printerResponse.brand} {item.printerResponse.model}</td>
                        <td className="py-2 px-4">{item.fileName}</td>
                        <td className="py-2 px-4">{item.totalPages}</td>
                        <td className="py-2 px-4">{item.paperSize}</td>
                        <td className="py-2 px-4">{new Date(item.startTime).toLocaleString()}</td>
                        <td className="py-2 px-4">{new Date(item.endTime).toLocaleString()}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            ) : (
                <p className="text-gray-600">Không có lịch sử in nào.</p>
            )}
          </div>
        </div>
      </div>
  );
};
export default SPSOHistory;