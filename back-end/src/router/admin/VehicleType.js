const express = require("express");
const router = express.Router();
const {
  addType,
  upload,
  editVehicleType,
  getVehicleType,
  deleteVehicleType,
  getVehicleTypeById,
} = require("../../controller/admin/VehicleType");
const auth = require("../../middleware/auth");

router.post("/addType", auth, upload.single("typeImage"), addType);
router.patch(
  "/editVehicleType/:id",
  auth,
  upload.single("typeImage"),
  editVehicleType
);
router.delete("/deleteVehicleType/:id", auth, deleteVehicleType);
router.get("/getVehicleType", auth, getVehicleType);
router.get("/getVehicleTypeById/:id", getVehicleTypeById);

module.exports = router;
