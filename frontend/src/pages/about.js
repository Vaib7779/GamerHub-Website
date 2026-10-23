import React from 'react';
import '../styles/about.css';

function About() {
  return (
    <div
  className="about-container"
  style={{
    backgroundImage: "url('/about-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  }}
>
      <div className="about-box">
        <h1>🎮 Welcome to GamersHub – Your Ultimate Gaming Marketplace! ⚡</h1>
        <p>
          At GamersHub, we bring gamers together from around the world 🌍 to buy and sell premium gaming accounts safely and easily! Whether you’re a PUBG warrior 🔫, a Clash of Clans strategist 🏰, or a Call of Duty legend 💣 — we’ve got you covered!
        </p>
        <h2>💰 Buy Accounts</h2>
        <p>
          Find high-level gaming accounts with rare skins, maxed-out gear, and exclusive items to boost your gameplay instantly! 🚀
        </p>
        <h2>🛒 Sell Accounts</h2>
        <p>
          Want to cash in on your hard work? Sell your gaming account to verified buyers and earn real money securely 💵.
        </p>
        <h2>✅ Why Choose Us?</h2>
        <ul>
          <li>Safe & Secure Transactions 🔐</li>
          <li>24/7 Support 💬</li>
          <li>Trusted by Thousands of Gamers ❤️</li>
          <li>Fast, Easy, and Reliable ⚡</li>
        </ul>
        <p>
          Join the hub where gamers connect, trade, and level up together! 🔥<br />
          <strong>Welcome to GamersHub – Play. Trade. Dominate. 🕹️</strong>
        </p>
      </div>
    </div>
  );
}

export default About;