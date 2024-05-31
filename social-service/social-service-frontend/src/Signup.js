import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', { username, password });
      console.log(response);
      alert(`User ${response.data.username} created successfully!`);
    } catch (error) {
      alert('Error: ' + error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="heading">Sign Up</h2>
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
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
