const express = require("express");
const router = express.Router();
const {
  addBooking,
  getBooking,
} = require("../../controller/admin/bookingController");
const auth = require("../../middleware/auth");

router.post("/addBooking", addBooking);
// router.patch("/editVehicle/:id", auth, editVehicle);
// router.delete("/deleteVehicle/:id", auth, deleteVehicle);
router.get("/getBooking", auth, getBooking);
// router.get("/getVehicleById/:id", getVehicleById);

module.exports = router;
