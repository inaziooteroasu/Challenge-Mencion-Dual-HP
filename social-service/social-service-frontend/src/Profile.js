import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
      <h2>Profile</h2>
      <p>Name: {user.username}</p>
      <p>Bio: {user.bio}</p>
      <button onClick={() => navigate('/friends')}>Friends</button>
      <button onClick={() => navigate('/requests')}>Requests</button>
      <button onClick={() => navigate('/search')}>Search</button>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
    </div>
  );
};

export default Profile;
