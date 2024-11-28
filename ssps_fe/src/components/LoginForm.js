import React, { useState } from "react";
import "./../styles/login.css";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import sendRequest from "../helpers/request";
import Button from "../components/Button";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";

    function handleSubmit(e) {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');

        let errors = 0;
        if (username.length <= 0) {
            setUsernameError("Please enter an username");
            errors++;
        }

        if (password.length <= 0) {
            setPasswordError("Please enter a password");
            errors++;
        }

        if (errors) {
            setFormError('Oops! An error occurred.');
            return;
        }

        sendRequest(
            'POST',
            '/login',
            {
                username: username,
                password: password
            }
        ).then((data) => {
            if (data.user === null) {
                // TODO: user pass false case
                setUsernameError('Username does not exist');
            } else {
                if (!data.correctPass) {
                    setPasswordError('Password does not match');
                } else {
                    // login success
                    login(data.user);
                    navigate(
                        fromPage,
                        { replace: true }
                    );
                }
            }
        });
    }

    return (
        <main className="ssoLogin">
            <p className="error">{formError}</p>
            <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="text-center mb-3">
            <img src="logo.png" alt="BK Logo" style={{ width: '100px' }} />
          </div>
          <h4 className="text-center mb-4">Đăng nhập bằng tài khoản của bạn:</h4>
       
          <div className="d-flex justify-content-center">
          <Button link="/student/home">
                    NGƯỜI DÙNG HCMUT
                </Button>
                <Button link="/admin/home">
                    ADMIN SSPO
                </Button>
        </div>
          
        </div>
      </div>
        </main>
    );
}