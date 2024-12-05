import React, { useState, useEffect } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest from '../API/fetchAPI';

const SPSOReport = () => {
  const [report, setReport] = useState(null);
  const [reportType, setReportType] = useState('thisMonth');
  const [monthYear, setMonthYear] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      let endpoint = '/api/v1/spso/report';
      if (reportType === 'monthYear') {
        endpoint = `/api/v1/spso/report?month=${monthYear}`;
      } else if (reportType === 'year') {
        endpoint = `/api/v1/spso/report/year/${year}`;
      }

      const response = await sendRequest('GET', endpoint);
      if (response && response.code === 200) {
        setReport(response.result);
      }
    };

    fetchReport();
  }, [reportType, monthYear, year]);

  const handleMonthYearChange = (e) => {
    setMonthYear(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <SPSOHeader />
      <div className="container mx-auto py-10 px-4 flex-1">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">SPSO Report</h1>

        {/* Report Type Selection */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <button
            onClick={() => setReportType('thisMonth')}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'thisMonth' ? 'bg-blue-700' : ''}`}
          >
            This Month
          </button>
          <button
            onClick={() => setReportType('monthYear')}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'monthYear' ? 'bg-blue-700' : ''}`}
          >
            Year-Month
          </button>
          <button
            onClick={() => setReportType('year')}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'year' ? 'bg-blue-700' : ''}`}
          >
            Year
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {reportType === 'monthYear' && (
            <div>
              <label htmlFor="monthYear" className="block text-gray-700 text-sm font-bold mb-2">Select Month/Year:</label>
              <input
                type="month"
                id="monthYear"
                value={monthYear}
                onChange={handleMonthYearChange}
                className="shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   

              />
            </div>
          )}
          {reportType === 'year' && (
            <div>
              <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Enter Year:</label>
              <input
                type="number"
                id="year"
                placeholder="Enter year (yyyy)"
                value={year}
                onChange={handleYearChange}
                className="shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   

              />
            </div>
          )}
        </div>

        {/* Report Display */}
        {report && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Report</h2>
            {report.month && <p><strong>Month:</strong> {report.month}</p>}
            <p><strong>Total Jobs:</strong> {report.totalJobs}</p>
            <p><strong>Total Pages:</strong> {report.totalPages}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SPSOReport;