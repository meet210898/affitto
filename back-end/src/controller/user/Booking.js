const Booking = require("../../model/admin/Booking");

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
  const currDate = new Date();
  try {
    let booking = await Booking.findByIdAndUpdate(req.params.id, {
      $set: { status: status.status },
    });

    // VerifyUserWhen(user.email, user.name);
    await Booking.updateMany({
      endDate: { $gt: currDate },
      $set: { status: false },
    });
    res.send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const booking = await Booking.find({
      userId: req.params.id,
      status: true,
    }).sort({ _id: "-1" });
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("vehicleId");
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  addBooking,
  editBookingStatus,
  getBookingByUserId,
  getBookingById,
};
