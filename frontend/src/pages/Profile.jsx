import React, { useState, useEffect, useRef } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/assets/avatar.png');
  const [message, setMessage] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      setFormData({
        username: savedUser.username || '',
        email: savedUser.email || '',
      });

      const imageUrl = savedUser.profileImage
        ? `http://localhost:5000${savedUser.profileImage}`
        : '/assets/avatar.png';

      setPreviewUrl(imageUrl);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // immediate preview
    }
  };

  const handleUpdate = async () => {
    setMessage('');
    if (!user || !user._id) {
      setMessage('User not found or invalid ID');
      return;
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('username', formData.username);
    if (profileImage) data.append('profileImage', profileImage);

    try {
      const res = await fetch(`http://localhost:5000/api/profile/${user._id}`, {
        method: 'PUT',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(result));
        setUser(result);
        setFormData({ username: result.username, email: result.email });

        const newImage = result.profileImage
          ? `http://localhost:5000${result.profileImage}`
          : '/assets/avatar.png';

        setPreviewUrl(newImage);
        setProfileImage(null);
        setMessage('Profile updated successfully!');
      } else {
        setMessage(result.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile');
    }
  };

  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {message && <p className="profile-message">{message}</p>}

      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleImageChange}
        hidden
      />

      <img
        className="profile-image"
        src={previewUrl}
        alt="Profile"
        onClick={() => fileRef.current.click()}
      />

      <div className="profile-form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="profile-form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>

      <button className="profile-update-button" onClick={handleUpdate}>
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
