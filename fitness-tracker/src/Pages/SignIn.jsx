import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import '../assets/css/style.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        useremail: email,
        userpassword: password
      });

      console.log("Login successful", response.data);
      // Set the JWT token in cookies
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token to expire in 1 day

      // Redirect to a different page after successful login
      navigate('/home'); // Change this to your desired route
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage("Invalid email or password");
    }
  };
  return (
    <div className="main-signup-div">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>
      <div className="background-circle circle4"></div>
      <div className="background-circle circle5"></div>
      <div className="container signup-container">
        <div className="row mt-4">
          <div className="col-12 col-md-6 col-sm-12 d-flex justify-content-center align-items-center img-div">
            <img src="https://www.pngplay.com/wp-content/uploads/6/Fitness-Couple-PNG-Clipart-Background.png" alt="Jeep" className="img-fluid sign-in-img" />
          </div>
          <div className="col-12 col-md-6 col-sm-12">
            <div className="signup-form">
              <h2>Login Form</h2>
              <p>Let's Login From Here</p>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  {errorMessage && <p className="error">{errorMessage}</p>}
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope"></i>

                    Email</label>
                  <input type="email" className="form-control" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Address" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock"></i>

                    Password</label>
                  <input type="password" className="form-control" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required />
                </div>
                <button type="submit" className="btn w-100 mt-5">Sign In</button>
              </form>
              <div className="divider">or</div>
              <div className="social-login">
                <a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="google"><i className="fab fa-google"></i></a>
                <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
              </div>
              <div className="login-text  ">
                Create Your Account If You Don't have, <Link to={'/signup'}>SignUp Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
