import LogoHCMUT from "./logoHCMUT.jsx"
import { useNavigate } from "react-router-dom";

export default function StudentHeader() {
    const navigate = useNavigate();
    const items = [
        { text: "Trang chủ", link: "/student/home" },
        { text: "In tài liệu", link: "/student/print" },
        { text: "Mua trang in", link: "/student/buy" },
        { text: "Lịch sử in", link: "/student/history" },
        { text: "Tài liệu của bạn", link: "/student/myDoc" },
        { text: "Chọn máy in", link: "/student/printer" },
    ];

    function handleLogoClick() {
        navigate("/student/home");
    }



    return (
        <header className="flex items-center w-full bg-blue-600">
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
            </nav>
        </header>
    );
}
