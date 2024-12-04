import React, { useContext, useEffect } from "react";
import Header from "../component/Header.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import Cookies from "js-cookie";
import { axiosClient1 } from "../API/fetchAPI.jsx";
import logobk from "../assets/bk_logo.svg";
import bk_background from "../assets/bk_background.png";
import person from "../assets/person.png";


const Home = () => {
    const { navigate, setUserDetails } = useContext(AuthContext); // Use AuthContext
    const token = Cookies.get("TOKEN");


    useEffect(() => {
        const token = Cookies.get("TOKEN");
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
                            navigate("/spso/home", { replace: true });
                        } else if (data.role === "USER") {
                            navigate("/student/home", { replace: true });
                        }
                    } else {
                        console.error("Failed to fetch user details");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        }

        fetchUserDetails()
    }, [token, navigate, setUserDetails, token]);
    
    return (
        <div
      className="relative flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bk_background})` }}
    >
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <img src={logobk} alt="BK Logo" className="h-32 w-32" />
        <div className="text-black">
          <h2 className="text-xl font-bold">ĐẠI HỌC QUỐC GIA TPHCM</h2>
          <h3 className="text-lg">TRƯỜNG ĐẠI HỌC BÁCH KHOA</h3>
        </div>
      </div>
      <div className="absolute top-16 right-16 z-10">
        <button
          onClick={() => window.location.href = "http://localhost:8081/sso/login"}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <img className="mr-2 w-8 h-8" src= {person} alt="personicon" />
          Đăng nhập
        </button>
      </div>
      <div className="relative z-10 text-center text-black">
        <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-[100px] font-bold">HCMUT</h1>
        <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-[100px] font-bold">DỊCH VỤ IN ẤN</h1>
        <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-[100px] font-bold">THÔNG MINH</h1>
      </div>
      <div className="absolute bottom-4 left-4 text-black text-sm z-10">
        <p>Copyright 2024 - Phát triển dựa trên Nhóm 5Q-241-CNPM</p>
      </div>
    </div>
    );
};

export default Home;
