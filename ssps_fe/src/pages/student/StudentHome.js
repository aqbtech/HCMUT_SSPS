import Button from "../../components/Button";
import Poster from "../../components/Poster";
import StudentHeader from "../../components/StudentHeader";
import Title from "../../components/Title";
import "./../../styles/student-homepage.css";
import PrinterComic from "./../../assets/img/Printer-Comic.png";
import { useAuth } from "../../contexts/AuthContext";
import Footer from "./../../components/LoginFooter";
import LoginFooter from "./../../components/LoginFooter";
export default function StudentHome() {
 

    return (
        <>
       <StudentHeader />
        <div className="student-homepage">
           
            <h1>CHÀO MỪNG BẠN QUAY TRỞ LẠI </h1>
  
        </div>
         <LoginFooter />
         </>
    );
}