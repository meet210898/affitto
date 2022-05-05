const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: true,
    trim: true,
  },
  stateImage: {
    type: String,
  },
});

const State = mongoose.model("State", stateSchema);

module.exports = State;
