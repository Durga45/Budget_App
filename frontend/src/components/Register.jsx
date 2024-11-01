import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './comp.css'; // Include your CSS for styling
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3000/api/user/register", { name, email, password });
      console.log("Signup successful:", response.data);

      const { user } = response.data;
      if (!user || !user.name) {
        throw new Error("User data is missing from the response");
      }

      localStorage.setItem('username', user.name);

      alert("Registration successful! Please log in.");

      // Reset fields after registration
      setName('');
      setEmail('');
      setPassword('');

      // Navigate to the login page after successful registration
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);

      // Handle error response
      if (err.response) {
        alert(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="registerContainer">
      <h4 className="registerTitle">Create an Account</h4>
      <form onSubmit={handleRegister} className="registerForm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="registerInput"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="registerInput"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="registerInput"
        />
        <button type="submit" className="registerSubmitButton">Register</button>
      </form>
      <div className="registerFooter">
        <p>Already have an account? 
          <span onClick={() => navigate('/login')} className="registerLink"> Login</span>
        </p>
      </div>
      <button onClick={() => navigate('/')} className="homeButton">Back to Home</button>
    </div>
  );
};

export default Register;
