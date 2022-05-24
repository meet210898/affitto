const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleType",
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String,
  },
});

const company = mongoose.model("Company", companySchema);

module.exports = company;
