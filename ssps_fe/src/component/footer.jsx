import { faFacebook, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Upper Section */}
            <div className="flex flex-col md:flex-row justify-between items-start p-8 border-b border-gray-300">
                <div className="mb-8 md:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Dịch vụ</h2>
                    {/* Add any list of services here if needed */}
                </div>
                <div className="mb-8 md:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Thông tin thêm</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline text-blue-500">Hỏi đáp</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-blue-500">Blog</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-blue-500">Yêu cầu hỗ trợ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Công ty</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline text-blue-500">Về chúng tôi</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-blue-500">Liên hệ</a>
                        </li>
                        <li className="flex items-center space-x-4 mt-4">
                            <a href="https://www.facebook.com/phuong.ngo0320/">
                                <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-2xl hover:text-blue-700" />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-2xl hover:text-blue-500" />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={faTelegram} className="text-blue-500 text-2xl hover:text-blue-600" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Lower Section */}
            <div className="py-4 px-8 flex justify-between items-center bg-gray-200 text-gray-600 text-sm">
                <ul className="flex space-x-6">
                    <li>
                        <a href="#" className="hover:underline">Điều khoản</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Bảo mật</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Cookies</a>
                    </li>
                </ul>
                <p>© 2024 Công ty của bạn. All rights reserved.</p>
            </div>
        </div>
    );
}
