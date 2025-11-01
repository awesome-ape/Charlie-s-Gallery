const express = require('express');
const uploadMW = require('../midware/upload');
const tokenController=require('../controllers/tokenController')
const userController = require('../controllers/userController');
const router = express.Router();
router.post('/',uploadMW.single('photo'),userController.register);
router.post('/login', userController.login);
router.get('/profile', tokenController.authenticateJWT, userController.getUserProfile);
module.exports = router;
