import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './gamedetails.css';

function GameDetails() {
  const { id } = useParams(); // format: game-index
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const [game, index] = id.split('-');
    const allIds = JSON.parse(localStorage.getItem('gamingIds') || '[]');
    const filtered = allIds.filter(
      (item) => item.game.toLowerCase().replace(/\s+/g, '') === game
    );
    setDetails(filtered[parseInt(index)]);
  }, [id]);

  if (!details) return <p>Loading...</p>;

  // ✅ Proper Add to Cart function
  const handleAddToCart = () => {
  const currentUser = localStorage.getItem('loggedInUser') || 'vaibhav';

  // Strip heavy imageData before saving
  const { imageData, ...lightItem } = details;

  // Load existing cart for this user
  const existingCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];

  // Add new item
  const updatedCart = [...existingCart, lightItem];

  // Save back to localStorage
  localStorage.setItem(`cart_${currentUser}`, JSON.stringify(updatedCart));

  alert('✅ Added to cart!');
};

  return (
    <div className="gamedetails-container">
      <h2>{details.game.toUpperCase()} ID Details</h2>

      <img
        src={details.imageData || '/default-id.jpg'}
        alt="Game ID"
        className="details-image"
      />

      <div className="details-info">
        {Object.entries(details).map(([key, value]) =>
          key !== 'imageData' && key !== 'imageName' ? (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ) : null
        )}
      </div>

      {/* ✅ Big centered Add to Cart button */}
      <div className="cart-btn-container">
        <button className="big-cart-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default GameDetails;