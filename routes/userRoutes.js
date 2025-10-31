const express = require('express');
const tokenController=require('../controllers/tokenController')
const userController = require('../controllers/userController');
const router = express.Router();
router.post('/', userController.register);
router.post('/login', userController.login);
module.exports = router;
