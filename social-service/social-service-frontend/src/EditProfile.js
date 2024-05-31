import React from 'react';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {

  const navigate = useNavigate(); // Define navigate usando useNavigate

  return (

      <div className="container">
        <div className="formContainer">
          <h2 className="heading"> Profile</h2>
          <form >
            <div className="formGroup">
              <label className="label">Username:</label>
  
            </div>
            <div className="formGroup">
              <label className="label">Bio:</label>

            </div>
            <div className="formGroup">
              <label className="label">Password:</label>

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
