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

// const editVehicle = async (req, res) => {
//   const updates = req.body;
//   let updateFields = {};
//   let newVehicle = {};
//   const fields = ["pucImage", "rcImage", "vehicleImage", "insuranceImage"];

//   try {
//     let oldVehicle = await Vehicle.findById(req.params.id, { __v: 0 });
//     let JSONoldVehicle = oldVehicle.toJSON();

//     Object.keys(req.files).forEach((field) => {
//       if (fields.includes(field)) {
//         updateFields[field] = req.files[field][0].path;
//       }
//     });

//     Object.keys(JSONoldVehicle).forEach((val) => {
//       newVehicle[val] = updates[val];
//     });

//     if (Object.keys(updateFields).length > 0) {
//       newVehicle = {
//         ...newVehicle,
//         _id: req.params.id,
//         ...updateFields,
//       };
//     } else {
//       newVehicle = {
//         ...newVehicle,
//         _id: req.params.id,
//       };
//     }

//     await Vehicle.findByIdAndUpdate(
//       req.params.id,
//       { $set: newVehicle },
//       {
//         new: true,
//       }
//     );
//     res.send(newVehicle);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

// const deleteVehicle = async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findById(req.params.id);
//     await vehicle.remove();
//     res.status(200).send({ msg: "Vehicle Deleted!!" });
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find({});
    res.status(200).send(booking);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// const getVehicleById = async (req, res) => {
//   try {
//     const vehicleId = req.params.id;
//     const vehicle = await Vehicle.findById(vehicleId);
//     res.status(200).send(vehicle);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

module.exports = {
  addBooking,
  getBooking,
};
