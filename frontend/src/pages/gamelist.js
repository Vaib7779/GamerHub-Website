import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './gamelist.css';

function GameList() {
  const { game } = useParams(); // 'coc', 'pubg', or 'cod'
  const [filteredIds, setFilteredIds] = useState([]);
  const navigate = useNavigate();

  const gameNames = {
    coc: 'Clash of Clans',
    pubg: 'PUBG Mobile',
    cod: 'Call of Duty',
  };

  useEffect(() => {
    const allIds = JSON.parse(localStorage.getItem('gamingIds') || '[]');
    const filtered = allIds.filter((id) => id.game === game);
    setFilteredIds(filtered);
  }, [game]);

  const handleClick = (index) => {
    navigate(`/details/${game}-${index}`);
  };

const handleAddToCart = (item) => {
  const currentUser = localStorage.getItem('loggedInUser') || 'vaibhav';

  const { imageData, ...lightItem } = item;
  const existingCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];
  const updatedCart = [...existingCart, lightItem];

  localStorage.setItem(`cart_${currentUser}`, JSON.stringify(updatedCart));

  alert('✅ Added to cart!');
};
  return (
    <div className="gamelist-container">
      <h2>{gameNames[game]} Listings</h2>
      {filteredIds.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        filteredIds.map((id, index) => (
          <div
            key={index}
            className="listing-card"
            onClick={() => handleClick(index)}
          >
            <img
              src={id.imageData || '/default-id.jpg'}
              alt={`${gameNames[game]} ID`}
              className="listing-thumb"
            />
            <div className="listing-info">
              <p><strong>Level:</strong> {id.level || id.rank || id.townHallLevel}</p>
              <p><strong>Description:</strong> {id.description?.slice(0, 50)}...</p>
              <p><strong>Price:</strong> ₹{id.price || 'N/A'}</p>
              <button
                className="cart-btn"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ prevent navigation
                  handleAddToCart(id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GameList;