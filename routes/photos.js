const uploadMW = require('../midware/upload');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/photos');

// Route to handle photo upload
router.post('/upload',uploadMW.single('photo'), controllers.uploadPhoto);

// Route to handle photo deletion
router.delete('/delete/:id', controllers.deletePhoto);

//Route to handle photo editing
router.put('/edit/:id', controllers.editPhoto);


module.exports = router;