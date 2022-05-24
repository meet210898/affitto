const express = require("express");
const router = express.Router();
const {
  getBooking,
  deleteBooking,
} = require("../../controller/admin/Booking");
const auth = require("../../middleware/auth");

router.get("/getBooking", auth, getBooking);
router.delete("/user/deleteBooking/:id", auth, deleteBooking);

module.exports = router;
