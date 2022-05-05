const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
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
    username: {
      type: String,
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
      default: false,
    },
    personalImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

registerUserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

registerUserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  return token;
};

registerUserSchema.statics.findByCredentials = async (email, password) => {
  const user = await registerUser.findOne({ email });
  if (!user) {
    throw new Error("Unable to find user by email");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to find user by password");
  }
  return user;
};

const registerUser = mongoose.model("RegisterUser", registerUserSchema);

module.exports = registerUser;
