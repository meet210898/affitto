const mongoose = require("mongoose");

const registerUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isVerify: {
      type: Boolean,
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "State",
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "City",
    },
    userType: {
      type: String,
      default: "Normal",
      required: true,
    },
    agencyName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    gstNumber: {
      type: String,
      trim: true,
    },
    gstFrontImage: {
      type: String,
    },
    gstBackImage: {
      type: String,
    },
    agencyCertificateImage: {
      type: String,
    },
    personalImage: {
      type: String,
    },
    signatureImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const registerUser = mongoose.model("RegisterUser", registerUserSchema);

module.exports = registerUser;
