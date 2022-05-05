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
} = require("../../controller/user/userController");

router.get("/user/getState", getState);
router.get("/user/getCity", getCity);
router.patch("/user/editUser/:id", upload.single("personalImage"), editUser);
router.get("/user/getUserById/:id", getUserById);
router.get("/user/getVehicleType", getVehicleType);
router.get("/user/getCompany", getCompany);
router.get("/user/getVehicle", getVehicle);
router.get("/user/getVehicleById/:id", getVehicleById);
router.get("/user/getVehicleByCompanyId/:id", getVehicleByCompanyId);

module.exports = router;
