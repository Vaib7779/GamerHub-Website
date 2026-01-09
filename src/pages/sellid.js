import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sellid.css';

function SellId() {
  const [selectedGame, setSelectedGame] = useState('');
  const [formData, setFormData] = useState({});
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle single image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // preview
        setImage(reader.result);   // base64 string for saving
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const currentUser = JSON.parse(localStorage.getItem('userInfo') || '{}');

  if (!currentUser.username) {
    alert('You must be logged in to sell an ID.');
    navigate('/login');
    return;
  }

  const fullData = {
    username: currentUser.username,
    email: currentUser.email,
    game: selectedGame.toLowerCase(),
    ...formData,
    description,
    imageData: image || '/default-id.jpg',
    createdAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('gamingIds') || '[]');
  localStorage.setItem('gamingIds', JSON.stringify([...existing, fullData]));

  console.log('Submitted:', fullData);
  setMessage('✅ ID submitted successfully! Redirecting to profile...');
  setTimeout(() => navigate('/profile'), 1500);
};


  return (
    <div className="sellid-container">
      <h2>Sell Your Gaming ID</h2>

      <div className="game-selector">
        <label>Select Game:</label>
        <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
          <option value="">-- Choose --</option>
          <option value="coc">Clash of Clans</option>
          <option value="pubg">PUBG Mobile</option>
          <option value="cod">Call of Duty</option>
        </select>
      </div>

      {selectedGame && (
        <form className="game-form" onSubmit={handleSubmit}>
          {selectedGame === 'coc' && (
            <>
              <input type="text" name="AGE" placeholder="Account Age" onChange={handleChange} required />
              <input type="text" name="townHallLevel" placeholder="Town Hall Level" onChange={handleChange} required />
              <input type="text" name="heroLevel" placeholder="Hero Level" onChange={handleChange} required />
              <input type="text" name="troopsLevel" placeholder="Troops Level" onChange={handleChange} required />
              <input type="text" name="builderBaseLevel" placeholder="Builder Base Level" onChange={handleChange} required />
              <textarea name="details" placeholder="Additional Details" onChange={handleChange} />
              <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              {preview && <img src={preview} alt="Preview" className="preview-image" />}
            </>
          )}

          {selectedGame === 'pubg' && (
            <>
              <input type="text" name="accountAge" placeholder="Account Age" onChange={handleChange} />
              <input type="text" name="level" placeholder="Account Level" onChange={handleChange} required />
              <input type="text" name="gunSkin" placeholder="Gun Skins" onChange={handleChange} />
              <input type="text" name="carSkin" placeholder="Car Skins" onChange={handleChange} />
              <input type="text" name="Mythic" placeholder="Mythic items" onChange={handleChange} />
              <input type="text" name="Rare" placeholder="Rare items" onChange={handleChange} />
              <textarea
                placeholder="Describe your PUBG account (level, skins, gear, etc.)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              {preview && <img src={preview} alt="Preview" className="preview-image" />}
            </>
          )}

          {selectedGame === 'cod' && (
            <>
              <input type="text" name="accountAge" placeholder="Account Age" onChange={handleChange} />
              <input type="text" name="rank" placeholder="Account Rank" onChange={handleChange} required />
              <input type="text" name="weaponSkin" placeholder="Weapon Skins" onChange={handleChange} />
              <input type="text" name="Mythic" placeholder="Mythic items" onChange={handleChange} />
              <input type="text" name="legendaryItems" placeholder="Legendary items" onChange={handleChange} />
              <textarea name="details" placeholder="Additional Details" onChange={handleChange} />
              <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              {preview && <img src={preview} alt="Preview" className="preview-image" />}
            </>
          )}

          <button type="submit">Submit</button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default SellId;