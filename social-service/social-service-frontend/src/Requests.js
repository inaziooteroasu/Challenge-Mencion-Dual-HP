import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate(); // Define navigate usando useNavigate

  useEffect(() => {
    if (user) {
      const fetchFriendRequests = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/friend-requests?username=${user.username}`);
          setRequests(response.data);
        } catch (error) {
          console.error('Error fetching friend requests', error);
        }
      };

      fetchFriendRequests();
    }
  }, [user]);

  const handleAccept = async (requester) => {
    try {
      const response = await axios.post('http://localhost:3001/accept-friend', { requester, requestee: user.username });
      alert(response.data.message);
      setRequests(requests.filter(request => request.requester !== requester));
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  const handleDecline = async (requester) => {
    try {
      const response = await axios.post('http://localhost:3001/decline-friend', { requester, requestee: user.username });
      alert(response.data.message);
      setRequests(requests.filter(request => request.requester !== requester));
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };


  return (
    <div className="container">
        <div className="formContainer">
            <h2 className="heading">Requests</h2>
            {requests.length === 0 ? (
                <p className="label">No friend requests</p>
              ) : (
                
                <ul>
                  {requests.map((request, index) => (
                    <li key={index}>
                      {request.requester}
                      <button className="button" style={{ marginTop: "10px" }} onClick={() => handleAccept(request.requester)}>Accept</button>
                      <button className="button" style={{ marginTop: "10px" }} onClick={() => handleDecline(request.requester)}>Decline</button>
                    </li>
                  ))}
                </ul>
              )}


            <button className="buttonback" onClick={() => navigate('/profile')}>BACK</button>

        </div>
    </div>
  );
};

export default Requests;
