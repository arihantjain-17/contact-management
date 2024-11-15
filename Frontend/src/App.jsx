import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { Container, Typography } from '@mui/material';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/contacts/getcontact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Contact Management</Typography>
      <ContactForm fetchContacts={fetchContacts} editingContact={editingContact} setEditingContact={setEditingContact} />
      <ContactsTable contacts={contacts} fetchContacts={fetchContacts} setEditingContact={setEditingContact} />
    </Container>
  );
}

export default App;
