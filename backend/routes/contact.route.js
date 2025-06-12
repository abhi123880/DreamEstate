const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controller/contact.controller.js');

router.post('/', submitContactForm);

module.exports = router;
