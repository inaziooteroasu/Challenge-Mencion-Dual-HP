import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Friends from './Friends';
import Requests from './Requests';
import Search from './Search';
import EditProfile from './EditProfile';
import './App.css'; // Importa el archivo CSS


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />      
          <Route path="/" element={<Login />} />      /* Página Princial, donde están el inicio y registrro */
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
