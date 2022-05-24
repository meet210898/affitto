const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
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
  description: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: Number,
    required: true,
    trim: true,
  },
  door: {
    type: Number,
    required: true,
    trim: true,
  },
  fuelType: {
    type: String,
    required: true,
    trim: true,
  },
  transmission: {
    type: String,
    required: true,
    trim: true,
  },
  ac: {
    type: Boolean,
    required: true,
    default: true,
  },
  rcImage: {
    type: String,
    required: true,
  },
  rcNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  pucImage: {
    type: String,
  },
  priceperday: {
    type: Number,
    required: true,
    trim: true,
  },
  insuranceImage: {
    type: String,
  },
});

const vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicle;
