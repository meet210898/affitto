const Booking = require("../../model/admin/bookingModel");

const addBooking = async (req, res) => {
  try {
    const bookingAdd = new Booking({
      ...req.body,
    });
    await bookingAdd.save();
    res.status(201).send({ msg: "Booking Added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
    console.log(e, "error");
  }
};

const editBookingStatus = async (req, res) => {
  const status = req.body;
  try {
    let booking = await Booking.findByIdAndUpdate(req.params.id, {
      $set: { status: status.bookingStatus },
    });
    // VerifyUserWhen(user.email, user.name);
    res.send(booking);
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

const getBookingByUserId = async (req, res) => {
  try {
    const booking = await Booking.find({ userId: req.params.id });
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  addBooking,
  editBookingStatus,
  getBookingByUserId,
  deleteBooking,
};
