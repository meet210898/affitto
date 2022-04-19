const express = require("express");
const router = new express.Router();
const {
  addRegisterUser,
  upload,
} = require("../../controller/user/registerUserController");
const auth = require("../../middleware/auth");
const imgUpload = upload.fields([
  { gstFrontImage: "gstFrontImage", maxCount: 1 },
  { gstBackImage: "gstBackImage", maxCount: 1 },
  { agencyCertificateImage: "agencyCertificateImage", maxCount: 1 },
  { personalImage: "personalImage", maxCount: 1 },
  { signatureImage: "signatureImage", maxCount: 1 },
]);

// router.post("/addUser", auth, imgUpload, addRegisterUser);
router.post("/addUser", auth, addRegisterUser);
module.exports = router;
