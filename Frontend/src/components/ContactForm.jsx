import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts, editingContact, setEditingContact }) => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  const [error, setError] = useState(''); // For showing validation or server errors

  React.useEffect(() => {
    if (editingContact) setContactData(editingContact);
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    // Client-side validation
    const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Matches email ending with @gmail.com

    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phone) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!phoneRegex.test(contactData.phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    if (!emailRegex.test(contactData.email)) {
      setError('Email must end with @gmail.com.');
      return;
    }

    try {
      if (editingContact) {
        // Update existing contact
        await axios.put(
          `http://localhost:4000/contacts/updatecontact/${editingContact._id}`,
          contactData
        );
        setEditingContact(null);
      } else {
        // Add new contact
        await axios.post('http://localhost:4000/contacts/newcontact', contactData);
      }
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
      });
      fetchContacts();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Server error message
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error saving contact:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">{editingContact ? 'Edit Contact' : 'Add New Contact'}</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        name="firstName"
        label="First Name"
        value={contactData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={contactData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        value={contactData.email}
        onChange={handleChange}
        required
        helperText="Must end with @gmail.com"
      />
      <TextField
        name="phone"
        label="Phone"
        value={contactData.phone}
        onChange={handleChange}
        required
        helperText="Must be exactly 10 digits"
      />
      <TextField
        name="company"
        label="Company"
        value={contactData.company}
        onChange={handleChange}
      />
      <TextField
        name="jobTitle"
        label="Job Title"
        value={contactData.jobTitle}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
