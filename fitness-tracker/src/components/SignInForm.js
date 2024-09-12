import React from 'react';
import '../assets/css/style.css'; 


const SignInForm = () => {
  return (
    <div className="signup-form">
      <h2>Login Form</h2>
      <p>Let's Login From Here</p>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input type="email" className="form-control" id="email" placeholder="Enter Your Email Address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <i className="fas fa-lock"></i> Password
          </label>
          <input type="password" className="form-control" id="password" placeholder="Enter Your Password" required />
        </div>
        <button type="submit" className="btn w-100 mt-5">Sign In</button>
      </form>
      <div className="divider">or</div>
      <div className="social-login">
        <a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="google"><i className="fab fa-google"></i></a>
        <a href="#" className="twitter"><i className="fab fa-twitter"></i></a>
      </div>
      <div className="login-text">
        Create Your Account If You Don't have, <a href="#">SignUp Here</a>
      </div>
    </div>
  );
};

export default SignInForm;
