import React from 'react';
import './pubgtournament.css';

function PubgTournament() {
  return (
    <div className="tournament-page">
      {/* Banner */}
      <header className="tournament-banner">
        <h1>🏆 PUBG Mobile Tournament</h1>
        <p>Compete, win prizes, and showcase your skills!</p>
      </header>



      {/* Tournament Info */}
      <section className="tournament-info">
        <h2>About the Tournament</h2>
        <p>
          Join our exclusive PUBG Mobile tournament hosted by GamersHub. 
          Battle against top players and stand a chance to win exciting rewards.
        </p>
      </section>

      {/* Rules Section */}
      <section className="tournament-rules">
        <h2>📜 Rules & Guidelines</h2>
        <ul>
          <li>Solo and Squad matches available.</li>
          <li>No cheating, hacks, or third‑party tools allowed.</li>
          <li>Players must register with a valid GamersHub ID.</li>
          <li>Match schedules will be shared via email.</li>
        </ul>
      </section>

      {/* Prize Pool */}
      <section className="tournament-prizes">
        <h2>💰 Prize Pool</h2>
        <p>1st Place: ₹10,000 + Trophy</p>
        <p>2nd Place: ₹5,000</p>
        <p>3rd Place: ₹2,500</p>
      </section>

      {/* Registration Button */}
      <section className="tournament-register">
        <button className="register-btn">Register Now</button>
      </section>
    </div>
  );
}

export default PubgTournament;