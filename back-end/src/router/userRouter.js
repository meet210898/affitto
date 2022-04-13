const express = require("express");
const router = new express.Router();
const { userRegister, userLogin } = require("../controller/userController");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
