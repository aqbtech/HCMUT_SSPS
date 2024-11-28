import Header from "../components/Header";
import LoginFooter from "../components/LoginFooter";
import Homepage_content from "../components/Homepage_content";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/homepage.css";
import {axiosClient, axiosClient1} from "../helpers/request";

export default function HomePage() {
    const navigate = useNavigate();
    const { setUserDetails } = useAuth();
    const token = Cookies.get("TOKEN");


    useEffect(() => {
        const token = Cookies.get("TOKEN");
        console.log(token);
        async function fetchUserDetails() {
            if (token) {
                try {
                    const response =
                        await axiosClient1.post("/sso/user-detail", {"token": `Bearer ${token}`});
                    console.log("userdetail", response)
                    if (response.status === 200) {
                        const data = await response.data;
                        setUserDetails(data);

                        if (data.role === "ADMIN") {
                            navigate("/admin", { replace: true });
                        } else if (data.role === "USER") {
                            navigate("/student", { replace: true });
                        }
                    } else {
                        console.error("Failed to fetch user details");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        }

        fetchUserDetails().then(r => console.log(r));
    }, [token, navigate, setUserDetails, token]);
    
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