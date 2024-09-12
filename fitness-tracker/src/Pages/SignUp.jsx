import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const SignUp = () => {
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
            navigate('/');
        } catch (error) {
            console.error("Error registering user", error.response?.data);
            setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <>
            <div class="main-signup-div">
                <div class="background-circle circle1"></div>
                <div class="background-circle circle2"></div>
                <div class="background-circle circle3"></div>
                <div class="background-circle circle4"></div>
                <div class="background-circle circle5"></div>
                <div class="container signup-container">
                    <div class="row mt-4">
                        <div class="col-12 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                            <img src="https://static.vecteezy.com/system/resources/previews/024/841/278/original/fresh-food-in-human-body-nutrition-for-human-human-body-made-of-vegetable-and-fruits-isolated-on-transparent-background-healthy-food-concept-generative-ai-free-png.png" alt="Jeep" class="img-fluid sign-up-img" />
                        </div>
                        <div class="col-12 col-md-6 col-sm-12">
                            <div class="signup-form">
                                <h2>Registration Form</h2>
                                <p>Let's get you started!</p>
                                <form onSubmit={formSubmit}>
                                    <div class="mb-3">
                                        {errorMessage && <p className="error">{errorMessage}</p>}
                                        <label for="firstName" class="form-label">
                                            <i class="fas fa-user"></i>

                                            Name</label>
                                        <input type="text" class="form-control" id="firstName" name='username'
                                            value={data.username} onChange={handleChange} placeholder="Enter Your Name" required />
                                    </div>

                                    <div class="mb-3">
                                        <label for="phone" class="form-label">
                                            <i class="fas fa-phone"></i>

                                            Phone</label>
                                        <input type="text" class="form-control" id="phone" placeholder="Enter Your Phone Number" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">
                                            <i class="fas fa-envelope"></i>

                                            Email</label>
                                        <input type="email" class="form-control" id="email" name='useremail'
                                            value={data.useremail}
                                            onChange={handleChange} placeholder="Enter Your Email Address" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">
                                            <i class="fas fa-lock"></i>

                                            Create Password</label>
                                        <input type="password" class="form-control" id="password" name='userpassword'
                                            value={data.userpassword}
                                            onChange={handleChange} placeholder="Enter Your Password" required />
                                    </div>

                                    <div className="input_box">
                                        <label htmlFor="userimage">Upload Image</label>
                                        <input type="file" name="userimage" onChange={handleImageChange} required />
                                    </div>
                                    <button type="submit" class="btn w-100">Sign Up</button>
                                </form>
                                <div class="divider">or</div>
                                <div class="social-login">
                                    <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" class="google"><i class="fab fa-google"></i></a>
                                    <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
                                </div>
                                <div class="login-text">
                                    If you have an account, <Link to={'/'}>Login Here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
