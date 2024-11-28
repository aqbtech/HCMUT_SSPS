import Button from "./Button";

import LogoHCMUT from "./LogoHCMUT";
import "../styles/header.css";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const items = [
        { text: "Trang chủ", link: "#"}, 
        { text: "Về chúng tôi", link: "#about-us"},
        { text: "Dịch vụ", link: "#services"},
        { text: "Liên hệ", link: "#contact"}
    ];

    function handleLogoClick() {
        navigate('/');
    }

    function handleLoginClick() {
        window.location.href = "http://localhost:8081/sso/login";
    }
    
    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}>
                <LogoHCMUT />
                
            </div>
            <NavBar 
                items={items}
                static={true}
            >
                <Button onClick={handleLoginClick}>
                    Đăng nhập
                </Button>
                <Button link="/Login">
                    Đăng kí
                </Button>
            </NavBar>
            
        </header>
    );
}