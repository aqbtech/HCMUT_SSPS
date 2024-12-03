import React, { useState } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest from '../API/fetchAPI';

const SPSOReport = () => {
  const [report, setReport] = useState(null);

  const fetchReport = async (endpoint) => {
    const response = await sendRequest('GET', endpoint );
    if (response && response.code === 200) {
      setReport(response.result);
    }
  };

  const handleThisMonthReport = () => {
    fetchReport('/api/v1/spso/report');
  };

  const handleMonthYearReport = () => {
    const monthYear = prompt('Enter year-month (yyyy-MM):');
    if (monthYear) {
      fetchReport(`/api/v1/spso/report?month=${yyyy-MM}`);
    }
  };

  const handleYearReport = () => {
    const year = prompt('Enter year (yyyy):');
    if (year) {
      fetchReport(`/api/v1/spso/report/year/${year}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <SPSOHeader />
      <div className="container mx-auto py-10 px-4 flex-1">
        <h1 className="text-2xl font-bold text-center mb-6">SPSO Report</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleThisMonthReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            This Month
          </button>
          <button
            onClick={handleMonthYearReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Year-Month
          </button>
          <button
            onClick={handleYearReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Year
          </button>
        </div>
        {report && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Report</h2>
            <p><strong>Month:</strong> {report.month}</p>
            <p><strong>Total Jobs:</strong> {report.totalJobs}</p>
            <p><strong>Total Pages:</strong> {report.totalPages}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SPSOReport;