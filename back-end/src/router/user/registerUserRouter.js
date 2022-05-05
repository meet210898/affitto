const express = require("express");
const router = new express.Router();
const {
  addUser,
  addRegisterUser,
  loginUser,
  upload,
} = require("../../controller/user/registerUserController");

const imgUpload = upload.fields([
  { name: "gstFrontImage", maxCount: 1 },
  { name: "gstBackImage", maxCount: 1 },
  { name: "agencyCertificateImage", maxCount: 1 },
  { name: "personalImage", maxCount: 1 },
  { name: "signatureImage", maxCount: 1 },
]);

router.post("/user/addAgency", imgUpload, addRegisterUser);
router.post("/user/addUser",upload.single("personalImage"), addUser);
router.post("/user/login", loginUser);

module.exports = router;
