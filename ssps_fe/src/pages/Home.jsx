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
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex flex-col items-center flex-grow gap-12">
                {/* Homepage main section */}
                <section
                    id="home"
                    className="relative flex items-center w-full gap-8 bg-white bg-cover bg-center bg-fixed px-8 py-20"
                    style={{
                        backgroundImage: "url('../assets/img/bk.jpg')",
                    }}
                >
                    <div className="relative z-10 flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Chào mừng bạn đến với BK!</h1>
                        <p className="mt-4 text-lg text-gray-700">
                            Khám phá các dịch vụ và thông tin từ Đại học Bách Khoa.
                        </p>
                    </div>
                </section>

                {/* About Us section */}
                <section className="flex flex-col items-center bg-gray-100 w-full px-8 py-16" id="about-us">
                    <h2 className="text-4xl font-bold text-gray-800">Về chúng tôi</h2>
                    <p className="mt-4 text-lg text-gray-600 text-center max-w-prose">
                        BK là một trong những trường đại học hàng đầu về khoa học kỹ thuật tại Việt Nam.
                    </p>
                </section>

                {/* Services section */}
                <section className="flex flex-col items-center w-full px-8 py-16 bg-white" id="services">
                    <h2 className="text-4xl font-bold text-gray-800">Dịch vụ</h2>
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
                        <div className="flex flex-col items-center justify-center w-40 h-40 bg-blue-100 rounded-lg shadow">
                            <span className="text-6xl text-blue-600">📚</span>
                            <p className="mt-2 text-lg font-medium text-gray-700">Thư viện</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-40 h-40 bg-blue-100 rounded-lg shadow">
                            <span className="text-6xl text-blue-600">💻</span>
                            <p className="mt-2 text-lg font-medium text-gray-700">Hỗ trợ CNTT</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-40 h-40 bg-blue-100 rounded-lg shadow">
                            <span className="text-6xl text-blue-600">🎓</span>
                            <p className="mt-2 text-lg font-medium text-gray-700">Tư vấn học tập</p>
                        </div>
                    </div>
                </section>

                {/* Contact section */}
                <section
                    id="contact"
                    className="flex flex-col md:flex-row items-center gap-12 w-full px-8 py-16 bg-gray-100"
                >
                    <div className="flex flex-col items-start text-left">
                        <h2 className="text-4xl font-bold text-gray-800">Liên hệ</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Liên hệ với chúng tôi để biết thêm thông tin chi tiết.
                        </p>
                    </div>
                    <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-4xl text-gray-700">📞</span>
                    </div>
                </section>
            </main>
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
