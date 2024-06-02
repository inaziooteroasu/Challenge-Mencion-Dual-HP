import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Importa el archivo CSS
import { useAuth } from './AuthContext';



const Profile = () => {

  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate(); // Definer navigate usando useNavigate
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
    
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/profile?username=${user.username}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="containerProfile">
        <div className="formContainerProfile">
          <h2 className="heading">Profile</h2>
          <p className="label">You need to log in to view your profile.</p>
          <button className="buttonback" onClick={() => navigate('/')}>BACK</button>
        </div>
      </div>
    );
  }

  return (
    <div className="containerProfile">
        <div className="formContainerProfile">

            <h2 className="heading">Profile</h2>
            <p className="label">Name: {userDetails.username}</p>
            <p className="label">Bio: {userDetails.bio}</p>
            <p className="label" style={{ marginBottom: "20px" }}>Password: {userDetails.password}</p>
            <div className="buttonContainer">
            <button className="buttonProfile" onClick={() => navigate('/friends')}>Friends</button>
            <button className="buttonProfile" onClick={() => navigate('/requests')}>Requests</button>
            <button className="buttonProfile" onClick={() => navigate('/search')}>Search</button>
            <button className="buttonProfile" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            </div>
            <button className="buttonback" onClick={() => navigate('/')}>BACK</button>
        </div>
    </div>
  );
  
};

export default Profile;
