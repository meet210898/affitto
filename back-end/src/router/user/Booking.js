const express = require("express");
const router = express.Router();
const {
  addBooking,
  editBookingStatus,
  getBookingByUserId,
  getBookingById,
} = require("../../controller/user/Booking");
const auth = require("../../middleware/userAuth");

router.post("/user/addBooking", auth, addBooking);
router.patch("/editBookingStatus/:id", auth, editBookingStatus);
// router.patch("/editVehicle/:id", auth, imgUpload, editVehicle);
router.get("/user/getBookingByUserId/:id", auth, getBookingByUserId);
router.get("/user/getBookingById/:id", auth, getBookingById);

module.exports = router;
