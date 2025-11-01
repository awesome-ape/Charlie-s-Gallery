const uploadMW = require('../midware/upload');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/photos');
const { authenticateJWT } = require('../controllers/tokenController');
// Route to handle photo upload
router.post('/upload',authenticateJWT,uploadMW.single('photo'), controllers.uploadPhoto);

// Route to handle photo deletion
router.delete('/delete/:id', authenticateJWT,controllers.deletePhoto);

//Route to handle photo editing
router.put('/edit/:id',authenticateJWT, controllers.editPhoto);


module.exports = router;