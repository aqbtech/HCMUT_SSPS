import Header from "../components/Header";
import Button from "../components/Button";
import Title from "../components/Title";
import Poster from "../components/Poster";
import OfficePrinter from "../assets/img/office-printer.jpg";
import PrinterFairyTales from "../assets/img/printer-fairy-tales.png";
import "../styles/homepage.css";
import IconCard from "../components/IconCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faListCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import ContactInfo from "../components/ContactInfo";
import LoginFooter from "./../components/LoginFooter";
import Copyright from "../components/Copyright";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Homepage_content from "../components/Homepage_content";
export default function HomePage() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const loggedIn = useRef(false);
    
    useEffect(() => {
        console.log("Check session effect at 127.0.0.1!");
        if (currentUser) {
            console.log("Update auth!!!");
            setAuth({user: currentUser});
            loggedIn.current = true;
        }
    }, []);

    useEffect(() => {
        console.log("User logged in?");
        if (Object.hasOwn(auth, 'user') && auth.user !== null) {
            if (auth.user.isAdmin) {
                console.log(typeof auth.user);
                console.log("Assminnnn");
                navigate(
                    '/admin',
                    { replace: true } 
                )
            } else {
                console.log(typeof auth.user);
                console.log("Studentttt");
                navigate(
                    '/student',
                    { replace: true }
                )
            }
            return;
        }
    });
    
    return (
        <>
        <Header />
        <div className="homepage">
         
          
         <main>
         
             
           
            <article className="homepage-main" id="home">
                  <Homepage_content />
                  <div className="homepage-main-left">
                     
                      
                  </div>
 
              </article>   

           
          </main>
    

         

      </div>
      <LoginFooter />
        </>
       
    );
}