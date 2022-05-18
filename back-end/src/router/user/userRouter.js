const express = require("express");
const router = new express.Router();
const {
  getState,
  getCity,
  getUserById,
  editUser,
  upload,
  getVehicleType,
  getCompany,
  getVehicle,
  getVehicleById,
  getVehicleByCompanyId,
  getFaqByFaqCategoryId,
  getFaq,
  getFaqCategory,
  getVehicleByTypeId,
} = require("../../controller/user/userController");

router.get("/user/getState", getState);
router.get("/user/getCity/:id", getCity);
router.patch("/user/editUser/:id", upload.single("personalImage"), editUser);
router.get("/user/getUserById/:id", getUserById);
router.get("/user/getVehicleType", getVehicleType);
router.get("/user/getCompany/:id", getCompany);
router.get("/user/getVehicle/:id", getVehicle);
router.get("/user/getFaq/:id", getFaq);
router.get("/user/getFaqCategory", getFaqCategory);
router.get("/user/getVehicleById/:id", getVehicleById);
router.get("/user/getVehicleByTypeId/:id", getVehicleByTypeId);
router.get("/user/getVehicleByCompanyId/:id", getVehicleByCompanyId);
router.get("/user/getFaqByFaqCategoryId/:id", getFaqByFaqCategoryId);

module.exports = router;
