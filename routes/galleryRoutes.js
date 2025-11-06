const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const jwt = require('../controllers/tokenController');

router.post('/newGallery', jwt.authenticateJWT, galleryController.createGallery);
router.delete('/deleteGallery/:id',jwt.authenticateJWT,galleryController.deleteGallery)
router.put('/editGallery/:id,',jwt.authenticateJWT,galleryController.editGallery)

module.exports = router;
