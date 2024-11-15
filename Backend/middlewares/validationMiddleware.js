// middlewares/validationMiddleware.js

const Contact = require('../models/Contact');

// Validate required fields
const validateContact = (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }
  next();
};

// Check for duplicate contacts
const checkDuplicateContact = async (req, res, next) => {
  const { email, phone } = req.body;

  try {
    const existingContact = await Contact.findOne({ $or: [{ email }, { phone }] });
    if (existingContact) {
      return res.status(400).json({
        message: 'A contact with this email or phone number already exists.',
      });
    }
    next();
  } catch (error) {
    console.error('Error checking duplicate contact:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { validateContact, checkDuplicateContact };
