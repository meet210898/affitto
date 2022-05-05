const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    trim: true,
  },
  typeImage: {
    type: String,
  },
});

const vehicleType = mongoose.model("VehicleType", vehicleTypeSchema);

module.exports = vehicleType;
