import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      alert(`Welcome ${response.data.username}`);
    } catch (error) {
      alert('Error: ' + error.response.data);
    }
    
  };

  return (
    <div className="container">
    <div className="formContainer">
      <h2 className="heading">Log In</h2>
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
        <button type="submit" className="button">Log In</button>
        

      </form>
    </div>
  </div>
);
};

export default Login;
