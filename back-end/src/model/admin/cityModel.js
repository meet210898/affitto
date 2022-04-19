const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "State",
  },
  cityName: {
    type: String,
    required: true,
    trim: true,
  },
  cityImage: {
    type: String,
    required:true
  }
});

const city = mongoose.model("City", citySchema);

module.exports = city;
