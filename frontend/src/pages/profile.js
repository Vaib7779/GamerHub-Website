import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
  const [gamingIds, setGamingIds] = useState([]);
  const [profileImage, setProfileImage] = useState('/default-profile.png');
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Load user info from localStorage (set after SQL signup/login)
    const storedUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setUserInfo(storedUser);

    // ✅ Load gaming IDs and filter by current user
    const allIds = JSON.parse(localStorage.getItem('gamingIds') || '[]');
    const userIds = allIds.filter((id) => id.username === storedUser.username);
    setGamingIds(userIds);

    // ✅ Load profile image if saved
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleDelete = (index) => {
    const allIds = JSON.parse(localStorage.getItem('gamingIds') || '[]');
    const userIds = allIds.filter((id) => id.username === userInfo.username);

    const updatedUserIds = [...userIds];
    updatedUserIds.splice(index, 1);

    const remaining = allIds.filter((id) => id.username !== userInfo.username);
    const finalList = [...remaining, ...updatedUserIds];

    setGamingIds(updatedUserIds);
    localStorage.setItem('gamingIds', JSON.stringify(finalList));
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('profileImage');
    alert('Logged out!');
    navigate('/login');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <label htmlFor="profile-upload">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          style={{ display: 'none' }}
        />
        <div className="profile-info">
          <h2>Welcome, {userInfo.username || 'Guest'}</h2>
          <p>Email: {userInfo.email || 'Not available'}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <h3>Your Listed Gaming IDs</h3>
      <div className="id-list">
        {gamingIds.length === 0 ? (
          <p>No gaming IDs submitted yet.</p>
        ) : (
          gamingIds.map((item, index) => (
            <div key={index} className="id-card">
              <img
                src={item.imageData || '/default-id.jpg'}
                alt="Game ID"
                className="id-image"
              />
              <div className="id-details">
                <p><strong>Game:</strong> {item.game}</p>
                {item.accountAge && <p><strong>Account Age:</strong> {item.accountAge}</p>}
                {item.level && <p><strong>Level:</strong> {item.level}</p>}
                {item.townHallLevel && <p><strong>Town Hall:</strong> {item.townHallLevel}</p>}
                {item.heroLevel && <p><strong>Hero Level:</strong> {item.heroLevel}</p>}
                {item.rank && <p><strong>Rank:</strong> {item.rank}</p>}
                {item.description && <p><strong>Description:</strong> {item.description}</p>}
                <p><strong>Price:</strong> ₹{item.price}</p>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;