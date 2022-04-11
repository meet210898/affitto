const express = require("express");
const router = new express.Router();
const { addState,upload } = require("../controller/adminController");
const auth = require('../middleware/auth');

router.post("/state", auth, upload.single('stateImage') ,addState);

module.exports = router;
