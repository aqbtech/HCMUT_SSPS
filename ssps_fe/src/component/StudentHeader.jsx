import LogoHCMUT from "./logoHCMUT.jsx"
import { useNavigate } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function StudentHeader() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const items = [
        { text: "Trang chủ", link: "/student/home" },
        { text: "In tài liệu", link: "/student/print" },
        { text: "Mua giấy in", link: "/student/buy" },
        { text: "Lịch sử in", link: "/student/history" },
        { text: "Tài liệu của bạn", link: "/student/myDoc" },
    ];

    function handleLogoClick() {
        navigate("/student/info");
    }


    function handleLogoutClick() {
        console.log("Đăng xuất clicked");
        window.location.href = "http://localhost:8081/sso/login";
        //fetch logout 8081
    }

    function handleStudentInfoClick() {
        navigate("/student/info");
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
        <header className="flex flex-wrap items-center justify-between w-full bg-[#252836] p-6 shadow-lg overflow-hidden">
      {/* Logo Section */}
      <div className="cursor-pointer mb-4 md:mb-0" onClick={handleLogoClick}>
        <LogoHCMUT />
      </div>

      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center justify-center w-full md:w-[16.75rem] h-[4.3125rem] bg-[#EA7C69] text-white font-semibold rounded-full transition hover:bg-[#d96b5a]"
          >
            {item.text}
          </a>
        ))}
      </nav>
            {/* Navigation Bar */}
            <nav className="flex items-center space-x-1">
                {items.map((item, index) => (
                    <div key={index}
                         className="hover:border-black rounded-lg p-2">
                        <a
                            href={item.link}
                            className="text-gray-800 hover:text-blue-500 hover:underline transition px-4 py-2 font-semibold shadow-sm"
                        >
                            {item.text}
                        </a>
                    </div>
                ))}
            </nav>

            <div className="ml-auto flex items-center gap-6 pr-8"> {/* Thêm ml-auto vào đây */}
                <div className="group relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    >
                        <i className="fas fa-caret-down"></i>
                        <span className="text-sm font-medium"></span> {/* Thêm văn bản nếu muốn */}
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                            <button
                                onClick={handleStudentInfoClick}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                            >
                                Hồ sơ
                            </button>
                            <button
                                onClick={handleLogoutClick}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md transition duration-200"
                            >
                                Thoát
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}
