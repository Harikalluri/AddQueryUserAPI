import axios from 'axios';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Add.css';

const Add = () => {
    let [Add, setAdd] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    let [errors, setErrors] = useState({});
    let [touched, setTouched] = useState({});
    let navigate = useNavigate();

    let handleLogin = () => {
        navigate('/');
    };

    let validateField = (name, value) => {
        let errorMsg = "";
        switch (name) {
            case "firstName":
                errorMsg = value.length >= 4 && value.length <= 15 ? "" : "First name must be between 4 and 15 characters.";
                break;
            case "lastName":
                errorMsg = value.length >= 1 && value.length <= 15 ? "" : "Last name must be between 1 and 15 characters.";
                break;
            case "userName":
                errorMsg = value.length >= 4 && value.length <= 10 ? "" : "Username must be between 4 and 10 characters.";
                break;
            case "email":
                if (/[A-Z]/.test(value)) {
                    errorMsg = "Please enter a valid email address in lowercase format.";
                } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
                    errorMsg = "Enter a valid email address.";
                } else {
                    errorMsg = "";
                }
                break;
            case "password":
                let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
                errorMsg = passwordRegex.test(value) ? "" : "Password must be 8-12 characters, contain uppercase, lowercase, special character, and a digit.";
                break;
            case "confirmPassword":
                errorMsg = value === Add.password ? "" : "Passwords must match.";
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    let handleChange = (e) => {
        let { name, value } = e.target;
        setAdd({ ...Add, [name]: value });
        if (touched[name]) {
            validateField(name, value);
        }
    };

    let handleFocus = (e) => {
        let { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, Add[name]);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(Add).forEach((key) => {
            if (!Add[key].trim()) {
                newErrors[key] = `${key} is required`;
            }
        });

        Object.keys(Add).forEach((key) => {
            validateField(key, Add[key]);
        });

        setErrors(newErrors);
        setTouched({
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            password: true,
            confirmPassword: true
        });

        if (Object.keys(newErrors).length > 0) {
            alert("Please fill in all required fields before submitting.");
            return;
        }

        for (let key in errors) {
            if (errors[key]) {
                alert("Please fix the errors before submitting.");
                return;
            }
        }

        try {
            let response = await axios.post("http://localhost:8978/job/add", Add);
            
            if (response.status === 201) {
                alert(`Status Code: ${response.status}\nAdded successfully!`);
                navigate("/display");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                let errorMsg = error.response.data;
                let statusCode = error.response.status;

                if (errorMsg.emailError) {
                    alert(`Status Code: ${statusCode}\n${errorMsg.emailError}`);
                }
                if (errorMsg.usernameError) {
                    alert(`Status Code: ${statusCode}\n${errorMsg.usernameError}`);
                }
            } else {
                const statusCode = error.response ? error.response.status : '500';
                alert(`Status Code: ${statusCode}\n An error occurred. Please try again.`);
            }
        }
    };

    return (
        <div id='main2'>
            <form method='post' id='add' onSubmit={handleSubmit}>
                <table id='addTable' cellPadding={11}>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} onFocus={handleFocus} />
                                {touched.firstName && errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} onFocus={handleFocus} />
                                {touched.lastName && errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="userName" placeholder="Username" onChange={handleChange} onFocus={handleFocus} />
                                {touched.userName && errors.userName && <div style={{ color: "red" }}>{errors.userName}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="email" name="email" placeholder="Email" onChange={handleChange} onFocus={handleFocus} />
                                {touched.email && errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} onFocus={handleFocus} />
                                {touched.password && errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} onFocus={handleFocus} />
                                {touched.confirmPassword && errors.confirmPassword && <div style={{ color: "red" }}>{errors.confirmPassword}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className='add'>Add</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" onClick={handleLogin} className='login'>Verify</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Add;
