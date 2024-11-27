// src/pages/HomePage.js
import React from "react";
import Header from "./header";
import Footer from "./Footer";
import Login from "../Login";


import "./HomePage.css"; 

function HomePage() {

  return (
    <>
        <Header />
        <div className="homepage">
      {/* Header */}
      

      {/* Nội dung trang */}
      <div className="homepage-content text-center py-5">
        <div className="container">
        <div className="blur-box">
        <h2>Chào mừng đến với dịch vụ in ấn thông minh tại HCMUT</h2>
          <p className="lead">
            Trường Đại học Bách Khoa TP.HCM cung cấp dịch vụ in ấn thông minh cho sinh viên và cán bộ, giúp việc in ấn trở nên dễ dàng và tiện lợi.
          </p>
          <p>
            Bạn có thể in tài liệu trực tuyến, theo dõi lịch sử in ấn và thực hiện các giao dịch thanh toán trực tuyến nhanh chóng và dễ dàng.
          </p>
        </div>
        </div>
      </div>
     </div>

   <Footer /> 

   </>
  );
}

export default HomePage;
