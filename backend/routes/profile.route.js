const express = require('express');
const router = express.Router();
const upload = require('../uploads/upload'); // ✅ Import reusable upload middleware
const { updateProfile } = require('../controller/profile.controller');

// PUT: Update Profile
router.put('/:id', upload.single('profileImage'), updateProfile);

module.exports = router;
