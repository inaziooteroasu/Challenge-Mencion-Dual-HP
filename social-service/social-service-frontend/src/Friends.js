import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';


const Friends = () => {

  const [friends, setFriends] = useState([]);
  const username = 'UsuarioEjemplo';
  const navigate = useNavigate(); // Define navigate usando useNavigate

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/friends?username=${username}`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Friends</h2>

            {friends.length === 0 ? (
                <p lassName="label">No friends... yet! Go to Search and start creating your network.</p>
              ) : (
                <ul>
                  {friends.map((friend, index) => (
                    <li key={index}>{friend.friend}</li>
                  ))}
                </ul>
            )}

            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Friends;
