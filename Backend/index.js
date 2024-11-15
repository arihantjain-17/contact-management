const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors);

app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});


const contactRoutes = require('./routes/contactroutes');

// Use contact routes
app.use('/contacts', contactRoutes);


require("./config/database").connect();