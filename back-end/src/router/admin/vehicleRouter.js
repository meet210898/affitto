const express = require("express");
const router = express.Router();
const {
  addVehicle,
  upload,
  getVehicle,
  deleteVehicle,
  editVehicle,
  getVehicleById,
} = require("../../controller/admin/vehicleController");
const auth = require("../../middleware/auth");
const imgUpload = upload.fields([
  { name: "vehicleImage", maxCount: 1 },
  { name: "rcImage", maxCount: 1 },
  { name: "pucImage", maxCount: 1 },
  { name: "insuranceImage", maxCount: 1 },
]);

router.post("/addVehicle", auth, imgUpload, addVehicle);
router.patch("/editVehicle/:id", auth, imgUpload, editVehicle);
router.delete("/deleteVehicle/:id", auth, deleteVehicle);
router.get("/getVehicle", auth, getVehicle);
router.get("/getVehicleById/:id", getVehicleById);

module.exports = router;
