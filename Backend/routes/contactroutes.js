const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactcontroller');

// POST - Add new contact
router.post('/newcontact', contactController.addContact);

// GET - Retrieve all contacts
router.get('/getcontact', contactController.getAllContacts);

// PUT - Update a contact by ID
router.put('/updatecontact/:id', contactController.updateContact);

// DELETE - Delete a contact by ID
router.delete('/deletecontact/:id', contactController.deleteContact);

module.exports = router;
 