import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Importa el archivo CSS ( se llama Signup pero tiene el toddos los js, luego ya lo ordenadre)

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      //alert(`Welcome ${response.data.username}`);
      navigate('/profile');
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', { username, password });
      console.log(response); //punt o de control
      //alert(`User ${response.data.username} created successfully!`);
      navigate('/profile');
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="heading">Social Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="formGroup">
            <button type="submit" className="button">Log In</button>
          </div>
        </form>
        <form onSubmit={handleSubmit2}>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
