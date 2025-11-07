require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const users = require('./routes/userRoutes.js');
require('custom-env').env(process.env.NODE_ENV, './config');
const bodyParser = require('body-parser');
const { mongooseConnect } = require('./config/mongoose');
const photoRoutes = require('./routes/photos');
const galleryRoutes = require('./routes/galleryRoutes');;
const app = express(); 

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongooseConnect();

// Use routes
app.use('/photos', photoRoutes);
app.use('/users', users);
app.use('/gallery', galleryRoutes);;
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
