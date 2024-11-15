const Contact = require('../models/Contact');

// Add new contact
exports.addContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'First Name, Last Name, Email, and Phone are required.' });
    }

    const newContact = new Contact({ firstName, lastName, email, phone, company, jobTitle });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact', error });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error });
  }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const contact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};
