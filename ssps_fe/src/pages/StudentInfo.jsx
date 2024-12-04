import React, { useState, useEffect } from 'react';
import StudentHeader from '../component/StudentHeader';
import sendRequest, { sendGetRequest } from '../API/fetchAPI';
import Cookies from "js-cookie";

const StudentInfo = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        id: '',
        remaining_balance: '',
        used_page: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = Cookies.get('TOKEN');
            if (token) {
                const response = await sendGetRequest('/api/user/info');
                if (response) {
                    setUserInfo({
                        username: response.username,
                        id: response.id,
                        remaining_balance: response.remaining_balance,
                        used_page: response.used_page
                    });
                }
            } else {
                window.location.href = "http://localhost:8081/sso/login";
            }
        };

        fetchUserInfo();
    }, []);
    return (
    <div className="flex flex-col min-h-screen">
        <StudentHeader />
        <div className="flex flex-col items-center justify-center flex-1 p-4">
                <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">User Information</h2>
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>ID:</strong> {userInfo.id}</p>
                    <p><strong>Remaining Balance:</strong> {userInfo.remaining_balance}</p>
                    <p><strong>Used Page:</strong> {userInfo.used_page}</p>
                    
                </div>
            </div>
    </div>
    );
};

export default StudentInfo;