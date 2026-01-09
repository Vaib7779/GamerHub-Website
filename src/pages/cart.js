import React, { useState, useEffect } from 'react';
import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // ✅ Get current logged-in user
    const currentUser = localStorage.getItem('loggedInUser');
    if (!currentUser) {
      setCartItems([]);
      return;
    }

    // ✅ Load that user's cart
    const storedCart = localStorage.getItem(`cart_${currentUser}`);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(parsedCart);
  }, []);

  const removeFromCart = (index) => {
    const currentUser = localStorage.getItem('loggedInUser');
    if (!currentUser) return;

    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    const currentUser = localStorage.getItem('loggedInUser');
    if (!currentUser) return;

    setCartItems([]);
    localStorage.removeItem(`cart_${currentUser}`);
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.image || '/default-id.jpg'}
                  alt={item.game || 'Game ID'}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h3>{item.game?.toUpperCase() || 'Unnamed ID'}</h3>
                  <p>{item.price ? `₹${item.price}` : 'Price not listed'}</p>
                  <p>{item.description || 'No description available'}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="cart-total">🧾 Total: ₹{total}</p>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

export default Cart;