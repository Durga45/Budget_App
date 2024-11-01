import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './comp.css'; // Include your CSS for styling
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for a token and redirect if authenticated
    if (localStorage.getItem('userToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", { email, password });
      console.log('Login successful:', response.data);

      // Access the token from the response
      const { token } = response.data; // Adjust based on your API response
      if (!token) {
        throw new Error("Token is missing from the response");
      }

      // Store token in local storage
      localStorage.setItem('userToken', token); // Store the token
      localStorage.setItem('username', email.split('@')[0]); // Store a derived username from email

      // Navigate to the dashboard after a successful login
      navigate('/dashboard');

    } catch (err) {
      console.error('Login failed:', err);

      // Handle error response
      if (err.response) {
        alert(err.response.data.message || 'Login failed. Please try again.');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="loginContainer">
      <h4 className="loginTitle">Login to Your Account</h4>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className="loginInput"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className="loginInput"
        />
        <button type="submit" className="loginButton">Login</button>
        <div className="footer">
          <p className="footbg">Don't have an account? 
            <span onClick={() => navigate('/register')} className="registerLink footbg"> Register</span>
          </p>
        </div>
      </form>
      <button onClick={() => navigate('/')} className="homeButton">Back to Home</button>
    </div>
  );
};

export default LoginPage;
