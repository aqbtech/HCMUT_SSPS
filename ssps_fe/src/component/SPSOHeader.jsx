import React, { useState, useRef, useEffect } from 'react';
import LogoHCMUT from "./logoHCMUT.jsx";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function SPSOHeader() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const items = [
        { text: "Trang chủ", link: "/spso/home" },
        { text: "Quản lí máy in", link: "/spso/manage" },
        { text: "Lịch sử in", link: "/spso/history" },
        { text: "Tạo báo cáo", link: "/spso/report" },
    ];

    function handleLogoClick() {
        navigate("/spso/info");
    }

    function handleLogoutClick() {

        window.location.href = "http://localhost:8081/sso/login";
        console.log("Đăng xuất clicked");
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="flex items-center justify-between w-full bg-blue-600 p-6 shadow-md">
            {/* Logo Section */}
            <div className="cursor-pointer" onClick={handleLogoClick}>
                <LogoHCMUT />
            </div>

            {/* Navigation Bar */}
            <nav className="flex items-center space-x-12">
                {items.map((item, index) => (
                    <div key={index} className="border-gray-300 hover:border-black rounded-lg p-4 transition-all duration-300">
                        <a
                            href={item.link}
                            className="text-gray-800 hover:text-blue-500 hover:underline transition px-6 py-2 font-semibold"
                        >
                            {item.text}
                        </a>
                    </div>
                ))}
            </nav>

            {/* Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600 transition"
                >
                    <i className="fas fa-caret-down"></i> {/* Font Awesome Dropdown Icon */}
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                        <button
                            onClick={handleLogoutClick}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            Thoát
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}