// controllers/profile.controller.js
const User = require('../models/User');
const path = require('path');

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedFields = { username, email };
    if (profileImage) updatedFields.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateProfile,
};