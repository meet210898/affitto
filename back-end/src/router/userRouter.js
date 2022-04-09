const express = require('express');
const router = new express.Router();
const {userRegister,userLogin} = require('../controller/userController');
const User = require('../model/userModel');

router.post('/register',userRegister);
router.post('/login',userLogin);

module.exports = router;