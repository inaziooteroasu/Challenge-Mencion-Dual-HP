import React from 'react';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const Friends = () => {

  const navigate = useNavigate(); // Define navigate usando useNavigate

  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Friends</h2>
            <div className="formGroup">
                <p className="label">Contenido Friends</p>
            </div>
            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Friends;
