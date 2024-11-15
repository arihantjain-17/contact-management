import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts, editingContact, setEditingContact }) => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  // Populate form when editing an existing contact
  React.useEffect(() => {
    if (editingContact) setContactData(editingContact);
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        // Update existing contact
        await axios.put(`http://localhost:4000/contacts/updatecontact/${editingContact._id}`, contactData);
        setEditingContact(null);
      } else {
        // Add new contact
        await axios.post('http://localhost:5000/contacts/newcontact', contactData);
      }
      setContactData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">{editingContact ? 'Edit Contact' : 'Add New Contact'}</Typography>
      <TextField name="firstName" label="First Name" value={contactData.firstName} onChange={handleChange} required />
      <TextField name="lastName" label="Last Name" value={contactData.lastName} onChange={handleChange} required />
      <TextField name="email" label="Email" value={contactData.email} onChange={handleChange} required />
      <TextField name="phone" label="Phone" value={contactData.phone} onChange={handleChange} required />
      <TextField name="company" label="Company" value={contactData.company} onChange={handleChange} />
      <TextField name="jobTitle" label="Job Title" value={contactData.jobTitle} onChange={handleChange} />
      <Button type="submit" variant="contained" color="primary">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
