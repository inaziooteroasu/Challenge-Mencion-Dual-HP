import React from 'react';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const Search = () => {

  const navigate = useNavigate(); // Define navigate usando useNavigate

  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Search</h2>
            <div className="formGroup">
                <p className="label">Contenido Search</p>
            </div>
            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Search;
