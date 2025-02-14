import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    let [login, setLogin] = useState({
        email: "",
        password: ""
    });

    let [errors, setErrors] = useState({});
    let [touched, setTouched] = useState({});
    let navigate = useNavigate();

    let validateField = (name, value) => {
        let errorMsg = "";

        switch (name) {
            case "email":
                errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
                break;
            case "password":
                errorMsg = value.length >= 8 ? "" : "Password must be at least 8 characters.";
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    let handleChange = (e) => {
        let { name, value } = e.target;
        setLogin({ ...login, [name]: value });

        if (touched[name]) {
            validateField(name, value);
        }
    };

    let handleFocus = (e) => {
        let { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, login[name]);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        if (!login.email || !login.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            let response = await axios.post("http://localhost:8978/job/login", login);

            if (response.status === 200) {
                window.localStorage.setItem("token", response.data.token);
                alert(`Success ${response.status}: Login successful!`);
                navigate('/display');
            }
        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 404) {
                    alert(`Error ${statusCode}: User account does not exist!`);
                } else if (statusCode === 401) {
                    alert(`Error ${statusCode}: Incorrect password!`);
                } else {
                    alert(`Error ${statusCode}: An error occurred. Please try again.`);
                }
            } else {
                alert("Server error: Unable to connect to backend.");
            }
        }
    };

    return (
        <div id='main'>
            <form method='post' id='login' onSubmit={handleSubmit}>
                <table id='logintable'>
                    <tbody>
                        <tr>
                            <td>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email"
                                    onChange={handleChange} 
                                    onFocus={handleFocus}
                                />
                                {touched.email && errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter your password"
                                    onChange={handleChange} 
                                    onFocus={handleFocus}
                                />
                                {touched.password && errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Verify</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" onClick={() => navigate('/add')}>Add New User</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Login;
