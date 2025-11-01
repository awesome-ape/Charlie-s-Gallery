const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const jwt = require('../controllers/tokenController');

router.post('/newGallery', jwt.authenticateJWT, galleryController.createGallery);

module.exports = router;
