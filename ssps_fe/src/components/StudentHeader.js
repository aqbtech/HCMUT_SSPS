import LogoHCMUT from "./LogoHCMUT";
import LogoSSPS from "./LogoSSPS";
import NavBar from "./Navbar";
import ProfileIcon from "./ProfileIcon";
import "./../styles/student-header.css";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

export default function StudentHeader(props) {
  

    const items = [
        { text: "Trang chủ", link: "/student"}, 
        { text: "In tài liệu", link: "/student/print"},
        { text: "Mua trang in", link: "/student/buy"},
        { text: "Lịch sử in", link: "/student/log"},
        { text:  "Tài liệu của bạn ", link: "/student/print"},
        { text: "Chọn máy in ", link: "/student/registerprinter"}

    ];

    return (
        <header className="student-header">
            <div className="logo">
                <LogoHCMUT />
               
            </div>
            <NavBar 
                items={items} 
                static={false} 
            >
                
            </NavBar>
        </header>
    );
}