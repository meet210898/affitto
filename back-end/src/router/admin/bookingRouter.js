const express = require("express");
const router = express.Router();
const {
  getBooking,
} = require("../../controller/admin/bookingController");
const auth = require("../../middleware/auth");

router.get("/getBooking", auth, getBooking);

module.exports = router;
