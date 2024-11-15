const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactcontroller');

// POST - Add new contact
router.post('/', contactController.addContact);

// GET - Retrieve all contacts
router.get('/', contactController.getAllContacts);

// PUT - Update a contact by ID
router.put('/:id', contactController.updateContact);

// DELETE - Delete a contact by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
