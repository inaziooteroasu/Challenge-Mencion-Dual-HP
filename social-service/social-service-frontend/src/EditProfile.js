import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const EditProfile = () => {

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

  return (

      <div className="container">
        <div className="formContainer">
          <h2 className="heading"> Profile</h2>
          <form >
            <div className="formGroup">
            <label className="label">Username:</label>

            <input
                  type="text"
                  value={userDetails.username}
                  //onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="input"
            />
  
            </div>
            <div className="formGroup">
              <label className="label">Bio: </label>
              <input
                  type="text"
                  value={userDetails.bio}
                 // onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="input"
            />

            </div>
            <div className="formGroup">
              <label className="label">Password: </label>
              <input
                  type="text"
                  value={userDetails.password}
                  //onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="input"
            />

            </div>
            <div className="formGroup">
              <button type="submit" className="buttonProfile">Set changes</button>

            </div>             
             <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

          </form> 
        </div> 

      </div>
      


  );
};

export default EditProfile;
