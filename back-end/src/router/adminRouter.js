const express = require("express");
const router = new express.Router();
const { addState,upload,getState } = require("../controller/adminController");
const auth = require("../middleware/auth");

router.post("/state",auth,  upload.single('stateImage') ,addState);

router.get("/getState", auth, getState);


module.exports = router;
