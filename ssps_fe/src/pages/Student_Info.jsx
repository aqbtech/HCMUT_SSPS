import StudentHeader from "../component/StudentHeader";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import sendGetRequest from "../API/fetchAPI";

const Student_Info = () => {
  const [userInfo, setUserInfo] = useState({});
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch thông tin người dùng
    const fetchInfor = async () => {
      try {
        const result = await sendGetRequest("GET", `/api/v1/student/information`);
        if (result) {
          setUserInfo(result); // Đặt trực tiếp result (vì API trả về đúng thông tin cần thiết)
        }
      } catch (err) {
        toast.error("Không lấy được thông tin người dùng");
      }
    };

    // Fetch danh sách tài liệu
    const fetchDocument = async () => {
      try {
        const result = await sendGetRequest("GET", `/api/v1/document/all-documents`);
        if (result && result.content) {
          setDocuments(result.content); // Đặt danh sách tài liệu từ `result.content`
        }
      } catch (err) {
        toast.error("Không lấy được danh sách tài liệu");
      }
    };

    fetchInfor();
    fetchDocument();
  }, []);

  return (
      <div>
        <StudentHeader />
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin người dùng */}
            <div>
              <h2 className="text-2xl font-bold mb-4">THÔNG TIN NGƯỜI DÙNG</h2>
              <div className="mb-4">
                <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
                  Họ và Tên:
                </label>
                <input
                    type="text"
                    id="fullname"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={`${userInfo.firstname || ""} ${userInfo.lastname || ""}`}
                    readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">
                  Ngày sinh:
                </label>
                <input
                    type="text"
                    id="dob"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={userInfo.dob || ""}
                    readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="remainingBalance" className="block text-gray-700 font-bold mb-2">
                  Số dư còn lại:
                </label>
                <input
                    type="text"
                    id="remainingBalance"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={`${userInfo.remainingBalance || 0}`}
                    readOnly
                />
              </div>
            </div>

            {/* Danh sách tài liệu */}
            <div>
              <h2 className="text-2xl font-bold mb-4">DANH SÁCH TÀI LIỆU CỦA BẠN</h2>
              {documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                        <div key={index} className="border rounded-lg p-4 flex items-center">
                          <i className="fas fa-file-alt text-4xl mr-4"></i> {/* Icon tài liệu */}
                          <span>{doc.name}</span>
                        </div>
                    ))}
                  </div>
              ) : (
                  <p>Không có tài liệu nào được tìm thấy.</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Student_Info;
