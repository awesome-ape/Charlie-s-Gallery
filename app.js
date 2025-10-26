require ('dotenv').config();
const express = require('express');
const app = express();
const { mongooseConnect } = require('./config/mongoose');
const photoRoutes = require('./routes/photos');

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongooseConnect();

// Use photo routes
app.use('/photos', photoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});