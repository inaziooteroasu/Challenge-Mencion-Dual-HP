import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Importa el archivo CSS



const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Define navigate usando useNavigate

  useEffect(() => {
    // Aquí deberías obtener la información del usuario desde tu backend
    

    
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
    <h2 className="heading">Profile</h2>
    <p className="label">Name: {user.username}</p>
    <p className="label">Bio: {user.bio}</p>
    <div className="buttonContainer">
      <button className="buttonProfile" onClick={() => navigate('/friends')}>Friends</button>
      <button className="buttonProfile" onClick={() => navigate('/requests')}>Requests</button>
      <button className="buttonProfile" onClick={() => navigate('/search')}>Search</button>
      <button className="buttonProfile" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
    </div>
  </div>
  );
};

export default Profile;
