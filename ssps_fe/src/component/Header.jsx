
import LogoHCMUT from "./logoHCMUT.jsx"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const items = [
        { text: "Trang chủ", link: "#" },
        { text: "Về chúng tôi", link: "#about-us" },
        { text: "Dịch vụ", link: "#services" },
        { text: "Liên hệ", link: "#contact" },
    ];

    function handleLogoClick() {
        navigate("/");
    }

    function handleLoginClick() {
        window.location.href = "http://localhost:8081/sso/login";
    }

    return (
        <header className="w-full flex items-center justify-between px-4 py-4 bg-blue-300 shadow-md">
            {/* Logo Section */}
            <div className="cursor-pointer" onClick={handleLogoClick}>
                <LogoHCMUT />
            </div>

            {/* Navigation Bar */}
            <nav className="flex items-center space-x-8">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="text-gray-800 hover:text-blue-500 transition"
                    >
                        {item.text}
                    </a>
                ))}

                {/* Login Button */}
                <button
                    onClick={handleLoginClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
                >
                    Đăng nhập
                </button>
            </nav>
        </header>
    );
}
