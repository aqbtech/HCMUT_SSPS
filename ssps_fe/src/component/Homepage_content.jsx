import React from "react";

const HomepageContent = () => {
    return (
        <div className="py-10 bg-blue-50 text-center">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-blue-800">
                    Chào mừng đến với dịch vụ in ấn thông minh tại HCMUT
                </h2>
                <p className="mt-4 text-lg text-blue-700">
                    Trường Đại học Bách Khoa TP.HCM cung cấp dịch vụ in ấn thông minh cho sinh viên và cán bộ, giúp việc in ấn trở nên dễ dàng và tiện lợi.
                </p>
                <p className="mt-2 text-base text-blue-600">
                    Bạn có thể in tài liệu trực tuyến, theo dõi lịch sử in ấn và thực hiện các giao dịch thanh toán trực tuyến nhanh chóng và dễ dàng.
                </p>
            </div>
        </div>
    );
};

export default HomepageContent;
