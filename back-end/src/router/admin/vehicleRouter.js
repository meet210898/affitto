const express = require("express");
const router = express.Router();
const {
  addVehicle,
  upload,
  getVehicle,
} = require("../../controller/admin/vehicleController");
const auth = require("../../middleware/auth");
const imgUpload = upload.fields([
  { name: "vehicleImage", maxCount: 1 },
  { name: "rcImage", maxCount: 1 },
  { name: "pucImage", maxCount: 1 },
]);

router.post("/addVehicle", auth, imgUpload, addVehicle);
// router.patch(
//   "/editVehicleType/:id",
//   auth,
//   upload.single("typeImage"),
//   editVehicleType
// );
// router.delete("/deleteVehicleType/:id", auth, deleteVehicleType);
router.get("/getVehicle", auth, getVehicle);
// router.get("/getVehicleTypeById/:id", getVehicleTypeById);

module.exports = router;
