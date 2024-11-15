const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactcontroller');
const { validateContact, checkDuplicateContact } = require('../middlewares/validationMiddleware');
// POST - Add new contact
router.post('/newcontact',validateContact, checkDuplicateContact,contactController.addContact);

// GET - Retrieve all contacts 
router.get('/getcontact', contactController.getAllContacts);

// PUT - Update a contact by ID
router.put('/updatecontact/:id',validateContact, contactController.updateContact);

// DELETE - Delete a contact by ID
router.delete('/deletecontact/:id', contactController.deleteContact);

module.exports = router;
 