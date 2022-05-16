const Booking = require("../../model/admin/bookingModel");

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find({});
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  getBooking,
};
