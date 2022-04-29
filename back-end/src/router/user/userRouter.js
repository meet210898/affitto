const express = require("express");
const router = new express.Router();
const {
  getState,
  getCity,
  getUserById,
  editUser,
  upload,
} = require("../../controller/user/userController");

router.get("/user/getState", getState);
router.get("/user/getCity", getCity);
router.patch("/editUser/:id", upload.single("personalImage"), editUser);
router.get("/user/getUserById/:id", getUserById);

module.exports = router;
