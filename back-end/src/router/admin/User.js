const express = require("express");
const router = new express.Router();
const {
  getUser,
  getUserById,
  editUser,
} = require("../../controller/admin/User");
const auth = require("../../middleware/auth");

router.get("/getUser", auth, getUser);
router.get("/getUserById", auth, getUserById);
router.patch("/editUser/:id", auth, editUser);

module.exports = router;
