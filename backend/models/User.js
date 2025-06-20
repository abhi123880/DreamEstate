const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
