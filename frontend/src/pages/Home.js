
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const gameListings = [
  {
    id: 1,
    key: 'coc',
    name: 'Clash of Clans',
    price: '₹1,499',
    image: '/images/coc.jpg',
    description: 'TH14 account with max troops and skins.',
  },
  {
    id: 2,
    key: 'pubg',
    name: 'PUBG Mobile',
    price: '₹999',
    image: '/images/pubg.jpg',
    description: 'Level 70 account with rare outfits.',
  },
  {
    id: 3,
    key: 'cod',
    name: 'Call of Duty',
    price: '₹1,299',
    image: '/images/cod.jpg',
    description: 'Prestige account with legendary weapons.',
  },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const filteredGames = gameListings.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === gameListings.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Banner */}
        <header className="banner">
          <h1>Welcome to GamersHub 🎮</h1>
          <p>Your secure gaming ID marketplace</p>
        </header>

        {/* Navbar */}
        <nav className="navbar">
          <input
            type="text"
            placeholder="Search by game"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => navigate('/sell-id')}>Sell ID</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/cart')}>🛒 Cart</button>
          <button onClick={() => navigate('/about')}>About</button>
        </nav>

        {/* Carousel (auto-slide, no buttons) */}
        <section className="carousel">
          <div className="carousel-window">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {gameListings.map((game) => (
                <div key={game.id} className="carousel-slide">
                  <img src={game.image} alt={game.name} />
                  <div className="carousel-caption">
                    <h3>{game.name}</h3>
                    <p>{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Grid */}
        <section className="marketplace">
          <h2>Available Gaming IDs</h2>
          <div className="game-grid">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => navigate(`/list/${game.key}`)}
              >
                <img src={game.image} alt={game.name} />
                <h3>{game.name}</h3>
                <p>{game.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ PUBG Tournament Card */}
        <section className="tournament-section">
          <div
            className="tournament-card"
            onClick={() => navigate('/pubg-tournament')}
          >
            <div className="tournament-text">
              <h2>🏆 PUBG Mobile Tournament</h2>
              <p>
                Join our upcoming PUBG Mobile tournament and compete with the best
                players. Exciting prizes, live matches, and a chance to prove your
                skills!
              </p>
            </div>
            <div className="tournament-image">
              <img src="/images/pubg-tournament.png" alt="PUBG Tournament" />
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <div className="coming-soon-section">
          <h2>🎮 Coming Soon</h2>
          <p>PC & PS5 Gaming IDs will be available for sale soon!</p>
          <div className="coming-soon-cards">
            <div className="soon-card">
              <img src="/pc-icon.png" alt="PC Gaming" className="soon-icon" />
              <h3>PC Gaming IDs</h3>
              <p>
                Buy & sell accounts for popular PC titles like Valorant, CS:GO,
                GTA Online.
              </p>
            </div>
            <div className="soon-card">
              <img src="/ps5-icon.png" alt="PS5 Gaming" className="soon-icon" />
              <h3>PS5 Gaming IDs</h3>
              <p>
                Marketplace for PlayStation accounts — FIFA, Call of Duty, and
                more.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 GameVerse. All rights reserved. Designed by Vaibhav ❤️</p>
            <div className="social-icons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                📸
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;