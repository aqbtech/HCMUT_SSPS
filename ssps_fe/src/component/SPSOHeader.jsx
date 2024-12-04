import LogoHCMUT from "./logoHCMUT.jsx"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
export default function StudentHeader() {
    const navigate = useNavigate();
    const items = [
        { text: "Trang chủ", link: "/spso/home" },
        { text: "Quản lí máy in", link: "/spso/manage" },
        { text: "Lịch sử in", link: "/spso/history" },
        { text: "Tạo báo cáo", link: "/spso/report" },
    ];

    function handleLogoClick() {
        navigate("/spso/info");
    }

    const handleLogout = () => {
    Cookies.remove('TOKEN'); // Remove the token cookie
    Cookies.remove('VISITED_SPSO_HOME');
    window.location.href = "http://localhost:8081/sso/login"; // Redirect to the login page
  };


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

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 md:mt-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
}
