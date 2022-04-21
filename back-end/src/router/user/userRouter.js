const express = require("express");
const router = new express.Router();
const { getState, getCity } = require("../../controller/user/userController");

router.get("/user/getState", getState);
router.get("/user/getCity", getCity);

module.exports = router;
