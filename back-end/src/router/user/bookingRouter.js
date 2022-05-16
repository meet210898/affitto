const express = require("express");
const router = express.Router();
const {
  addBooking,
  editBookingStatus,
  getBookingByUserId,
  deleteBooking,
} = require("../../controller/user/bookingController");
const auth = require("../../middleware/userAuth");

router.post("/user/addBooking", auth, addBooking);
router.patch("/editBookingStatus/:id", auth, editBookingStatus);
// router.patch("/editVehicle/:id", auth, imgUpload, editVehicle);
router.delete("/user/deleteBooking/:id", auth, deleteBooking);
router.get("/user/getBookingByUserId/:id", auth, getBookingByUserId);

module.exports = router;
