const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "State",
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
});

const company = mongoose.model("Company", companySchema);

module.exports = company;
