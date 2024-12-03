import LogoHCMUT from "./logoHCMUT.jsx"
import { useNavigate } from "react-router-dom";

export default function StudentHeader() {
    const navigate = useNavigate();
    const items = [
        { text: "Trang chủ", link: "/spso/home" },
        { text: "Quản lí máy in", link: "/spso/manage" },
        { text: "Lịch sử in", link: "/spso/history" },
        { text: "Tạo báo cáo", link: "/spso/report" },
    ];

    function handleLogoClick() {
        navigate("/spso/home");
    }



    return (
        <header className="flex items-center w-full bg-blue-600">
            {/* Logo Section */}
            <div className="cursor-pointer mr-24" onClick={handleLogoClick}>
                <LogoHCMUT />
            </div>

            {/* Navigation Bar */}
            <nav className="flex items-center space-x-32">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="text-gray-800 hover:text-blue-500 transition px-4 py-2 font-semibold shadow-sm"
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </header>
    );
}
