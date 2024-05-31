import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {

  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Definer navigate usando useNavigate

  useEffect(() => {
    // Aquí 
    

    
    const fetchUserData = async () => {
      try {
        const username = 'UsuarioEjemplo'; 
        const response = await axios.get('http://localhost:3001/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (

      <div className="container">
        <div className="formContainer">
          <h2 className="heading"> Profile</h2>
          <form >
            <div className="formGroup">
            <label className="label">Username:</label>

            <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="input"
            />
  
            </div>
            <div className="formGroup">
              <label className="label">Bio: </label>
              <input
                  type="text"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="input"
            />

            </div>
            <div className="formGroup">
              <label className="label">Password: </label>
              <input
                  type="text"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
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
