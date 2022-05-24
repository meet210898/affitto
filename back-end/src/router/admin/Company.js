const express = require("express");
const router = new express.Router();
const {
  addCompany,
  upload,editCompany,
  getCompany,
  deleteCompany,
} = require("../../controller/admin/Company");
const auth = require("../../middleware/auth");

router.post("/addCompany", auth, upload.single("companyLogo"), addCompany);
router.patch(
  "/editCompany/:id",
  auth,
  upload.single("companyLogo"),
  editCompany
);
router.delete("/deleteCompany/:id", auth, deleteCompany);
router.get("/getCompany", auth, getCompany);
// router.get("/getCityById/:id", getCityById);

module.exports = router;
