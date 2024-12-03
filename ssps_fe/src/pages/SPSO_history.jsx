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
    const response = await sendGetRequest('GET', `/api/v1/spso/printerjob/printer/${printerId}`);
    if (response && response.code === 200) {
      setHistory(response.result);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    const response = await sendGetRequest('GET', `/api/v1/spso/printerjob/date/${date}`);
    if (response && response.code === 200) {
      setHistory(response.result);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <SPSOHeader />
      <div className="container mx-auto py-10 px-4 flex-1">
        <h1 className="text-2xl font-bold text-center mb-6">Printer History</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="text"
              id="printerId"
              name="printerId"
              value={printerId}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Printer ID"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Show History
            </button>
          </div>
        </form>
        <form onSubmit={handleDateSubmit} className="mb-6">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Show History by Date
            </button>
          </div>
        </form>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Printing History</h2>
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Student:</strong> {item.studentResponse.username}</p>
                  <p><strong>Printer:</strong> {item.printerResponse.brand} {item.printerResponse.model}</p>
                  <p><strong>File Name:</strong> {item.fileName}</p>
                  <p><strong>Total Pages:</strong> {item.totalPages}</p>
                  <p><strong>Paper Size:</strong> {item.paperSize}</p>
                  <p><strong>Start Time:</strong> {new Date(item.startTime).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(item.endTime).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SPSOHistory;