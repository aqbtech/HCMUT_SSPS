import React, { useState, useEffect } from 'react';
import SPSOHeader from '../component/SPSOHeader';
import sendRequest from '../API/fetchAPI';
import { toast } from 'react-toastify';

const SPSOReport = () => {
  const [report, setReport] = useState(null);
  const [reportType, setReportType] = useState('thisMonth');
  const [monthYear, setMonthYear] = useState('');
  const [year, setYear] = useState('');

  const fetchReport = async () => {
    let endpoint = '/api/v1/spso/report';
    if (reportType === 'monthYear') {
      endpoint = `/api/v1/spso/report?month=${monthYear}`;
    } else if (reportType === 'year') {
      endpoint = `/api/v1/spso/report/year?year=${year}`;
    }

    const response = await sendRequest('GET', endpoint);
    console.log("dm",response)
    if (response && response.code === 200) {
      toast.success("Tạo báo cáo thành công.");
      setReport(response.result);
    }
  };

  const handleMonthYearChange = (e) => {
    setMonthYear(e.target.value);
  };

  const handleYearChange = (e) => {
    if(e.target.value < 1)
      e.target.value = 1;
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(monthYear === "" && reportType ==='monthYear')
        return toast.error("Vui lòng chọn tháng, năm!")
    if(year === "" && reportType === 'year')
        return toast.error("Vui lòng chọn năm!")
    fetchReport();
  };
  const handleReportTypeChange = (type) => {
    setReportType(type);
    setReport(null);  // Reset the report whenever the report type changes
  };



  return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <SPSOHeader />
        <div className="container mx-auto py-10 px-4 flex-1">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Báo Cáo SPSO</h1>

          {/* Report Type Selection */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <button
                onClick={() => handleReportTypeChange('thisMonth')}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'thisMonth' ? 'bg-blue-700' : ''}`}
            >
              Tháng Này
            </button>
            <button
                onClick={() => handleReportTypeChange('monthYear')}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'monthYear' ? 'bg-blue-700' : ''}`}
            >
              Tháng-Năm
            </button>
            <button
                onClick={() => handleReportTypeChange('year')}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${reportType === 'year' ? 'bg-blue-700' : ''}`}
            >
              Năm
            </button>
          </div>

          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
            {reportType === 'monthYear' && (
                <div>
                  <label htmlFor="monthYear" className="block text-gray-700 text-sm font-bold mb-2">Chọn Tháng/Năm:</label>
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
                  <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Nhập Năm:</label>
                  <input
                      type="number"
                      id="year"
                      min="1"
                      placeholder="Nhập năm (yyyy)"
                      value={year}
                      onChange={
                        handleYearChange
                      }
                      className="shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
            )}
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-64"
            >
              Xác Nhận
            </button>
          </form>

          {/* Report Display */}
          {report && (
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Báo Cáo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hiển thị thông tin tháng nếu có */}
                  {report.month && (
                      <div>
                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tháng:</p>
                          <p className="text-gray-600">{report.month}</p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tổng Số Công Việc:</p>
                          <p className="text-gray-600">{report.totalJobs}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tổng Số Trang:</p>
                          <p className="text-gray-600">{report.totalPages}</p>
                        </div>
                      </div>
                  )}

                  {/* Hiển thị thông tin cho các tháng trong năm nếu có */}
                  {reportType === 'year' && Array.isArray(report) && report?.map((item, index) => (
                      <div key={index}>
                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tháng:</p>
                          <p className="text-gray-600">{item.month}</p>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tổng Số Công Việc:</p>
                          <p className="text-gray-600">{item.totalJobs}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <p className="text-lg font-semibold text-gray-700">Tổng Số Trang:</p>
                          <p className="text-gray-600">{item.totalPages}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default SPSOReport;