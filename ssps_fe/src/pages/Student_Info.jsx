import StudentHeader from "../component/StudentHeader";
import React, { useState } from 'react';

const Student_Info = () =>{
    const [userInfo, setUserInfo] = useState({
    name: 'NGUYEN VAN A',
    email: 'NGUYENVANA@HCMUT.EDU.VN',
    phone: '0855501412',
    //fetch API user info
  });

  const [documents, setDocuments] = useState([
    { name: 'Những vấn đề chính của Chủ Nghĩa Mác-Lê Nin.pdf' },
    { name: 'CHỦ NGHĨA XÃ HỘI KHOA HỌC.pdf' },
    //fetch API all docs
  ]);
    return (
        <div>
            <StudentHeader/>
            <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">THÔNG TIN NGƯỜI DÙNG</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Họ và tên:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
              value={userInfo.name}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"   

              value={userInfo.email}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Số điện thoại:
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
              value={userInfo.phone}
              readOnly
            />
          </div>
        </div>

        {/* Document List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">DANH SÁCH TÀI LIỆU CỦA BẠN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center">
                <i className="fas fa-file-alt text-4xl mr-4"></i> {/* Font Awesome file icon */}
                <span>{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
        </div>
    )
};
export default Student_Info;