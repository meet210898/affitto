const express = require("express");
const router = new express.Router();
const {
  getUser,
  getUserById,
} = require("../../controller/admin/userController");
const auth = require("../../middleware/auth");

router.get("/getUser", auth, getUser);
router.get("/getUserById", auth, getUserById);

module.exports = router;
