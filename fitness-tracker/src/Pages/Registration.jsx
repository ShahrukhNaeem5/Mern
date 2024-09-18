import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Registration = () => {
    const [data, setData] = useState({
        username: '',
        useremail: '',
        userpassword: '',
        userimage: null
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setData((prev) => ({
            ...prev,
            userimage: e.target.files[0] // Store the uploaded file in the state
        }));
    };

    const formSubmit = async (e) => {
        e.preventDefault();
    
        if (!data.userpassword) {
            setErrorMessage("Password is required.");
            return;
        }
    
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('useremail', data.useremail);
        formData.append('userpassword', data.userpassword);
        formData.append('userimage', data.userimage);
    
        try {
            const resData = await axios.post('http://localhost:4000/registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log("Data Registered", resData.data);
    
            // Set JWT token in cookies
            Cookies.set('token', resData.data.token);
    
            alert(`You Are Registered Successfully, ${data.username}`);
            setData({
                username: '',
                useremail: '',
                userpassword: '',
                userimage: null
            }); // Clear form fields
            navigate('/login');
        } catch (error) {
            console.error("Error registering user", error.response?.data);
            setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className='main-login'>
            <div className="login_form">
                <form onSubmit={formSubmit}>
                    <h3>Registration Form</h3>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className="input_box">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name='username' 
                            value={data.username} 
                            onChange={handleChange} 
                            placeholder="Enter Your Name" 
                            required 
                        />
                    </div>
                    <div className="input_box">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name='useremail' 
                            value={data.useremail} 
                            onChange={handleChange} 
                            placeholder="Enter email address" 
                            required 
                        />
                    </div>
                    <div className="input_box">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name='userpassword' 
                            value={data.userpassword} 
                            onChange={handleChange} 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <div className="input_box">
                        <label htmlFor="userimage">Upload Image</label>
                        <input type="file" name="userimage" onChange={handleImageChange} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
