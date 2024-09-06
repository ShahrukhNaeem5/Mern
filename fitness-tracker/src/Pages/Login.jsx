import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
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
      navigate('/dashboard'); // Change this to your desired route
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className='main-login'>
      <div className="login_form">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input_box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
