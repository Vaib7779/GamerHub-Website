import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SellId from './pages/sellid';
import About from './pages/about';
import Profile from './pages/profile';
import GameList from './pages/gamelist';
import GameDetails from './pages/gamedetails';
import Cart from './pages/cart';
import PubgTournament from './pages/PubgTournament';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>Page not found</div>} />
        

      <Route path="/about" element={<About />} /> {/* ✅ Add this */}



  <Route path="/sell-id" element={<SellId />} />
  

<Route path="/profile" element={<Profile />} />


<Route path="/list/:game" element={<GameList />} />
<Route path="/details/:id" element={<GameDetails />} />


<Route path="/cart" element={<Cart />} />
 <Route path="/pubg-tournament" element={<PubgTournament />} />

      </Routes>
    </Router>
  );
}

export default App;