const Booking = require("../../model/admin/bookingModel");

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find({});
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    await booking.remove();
    res.status(200).send({ msg: "Booking Deleted!!" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  deleteBooking,
  getBooking,
};
