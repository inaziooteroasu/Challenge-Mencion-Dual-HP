import React from 'react';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const Requests = () => {

  const navigate = useNavigate(); // Define navigate usando useNavigate

  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Request</h2>
            <div className="formGroup">
                <p className="label">Contenido Request</p>
            </div>
            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Requests;
