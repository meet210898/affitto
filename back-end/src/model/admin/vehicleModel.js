const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "State",
  },
  vehicleName: {
    type: String,
    required: true,
    trim: true,
  },
  vehicleImage: {
    type: String,
    required: true,
  },
});

const vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicle;
