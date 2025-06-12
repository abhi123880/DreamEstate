// controllers/contact.controller.js
const Contact = require('../models/Contact.js');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, location } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const newContact = new Contact({ name, email, location });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
