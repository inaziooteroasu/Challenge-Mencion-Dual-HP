import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const Search = () => {

  const [requestee, setRequestee] = useState('');
  const { user } = useAuth();

  const requester = user.username;
  const navigate = useNavigate(); // Define navigate usando useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/friend-request', { requester, requestee });
      alert(response.data.message);
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Search</h2>
            <form className="formGroup" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={requestee}
                    onChange={(e) => setRequestee(e.target.value)}
                    required
                />
                <button type="submit" className="buttonProfile" style={{ marginTop: "10px" }}>Send Request</button>
            </form>
            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Search;
