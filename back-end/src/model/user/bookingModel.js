const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vehicle",
    },
    startData: {
      type: Date,
      required: true,
    },
    endData: {
      type: Date,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    walletAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    accidentalInsurance: {
      type: Number,
      required: true,
      trim: true,
    },
    theftInsurance: {
      type: Number,
      required: true,
      trim: true,
    },
    transactionNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const booking = mongoose.model("Booking", bookingSchema);

module.exports = booking;
