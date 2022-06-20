const State = require("../../model/admin/State");
const City = require("../../model/admin/City");
const User = require("../../model/user/RegisterUser");
const VehicleType = require("../../model/admin/VehicleType");
const Company = require("../../model/admin/Company");
const Vehicle = require("../../model/admin/Vehicle");
const Faq = require("../../model/admin/Faq");
const FaqCategory = require("../../model/admin/FaqCategory");
const otpGenerator = require("otp-generator");
const { emailsend } = require("../../Email/email");
const bcrypt = require("bcryptjs");

const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  try {
    const user = await User.updateOne({ email: email }, { $set: { otp: otp } });
    res.status(200).send(user);
    emailsend(email, otp);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const checkOTP = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  try {
    if ((email && otp !== "") || (email && otp !== null)) {
      const user = await User.find({
        $and: [{ email: email }, { otp: otp }],
      });
      res.status(200).send(user);
    } else res.status(400).send({ msg: "cannot blank" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const changePassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  try {
    if (password === confirmpassword) {
      const bcryptPassword = await bcrypt.hash(password, 8);
      let user = await User.updateOne({
        email: email,
        password: bcryptPassword,
      });
      res.status(200).send(user);
    } else res.status(400).send({ msg: "wrong password" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getState = async (req, res) => {
  try {
    const state = await State.find({});
    res.status(200).send(state);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getCity = async (req, res) => {
  let city;
  try {
    if (req.params.id !== "0") {
      city = await City.find().limit(4);
    } else {
      city = await City.find();
    }
    res.status(200).send(city);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.find({});
    res.status(200).send(vehicleType);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getCompany = async (req, res) => {
  let company;
  try {
    if (req.params.id !== "0") {
      company = await Company.find().limit(4);
    } else {
      company = await Company.find();
    }
    res.status(200).send(company);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicle = async (req, res) => {
  let vehicle;
  try {
    if (req.params.id !== "0") {
      vehicle = await Vehicle.find().limit(2);
    } else {
      vehicle = await Vehicle.find();
    }
    res.status(200).send(vehicle);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);
    res.status(200).send(vehicle);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicleByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const vehicle = await Vehicle.find({ companyId: companyId });
    res.status(200).send(vehicle);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicleByTypeId = async (req, res) => {
  try {
    const typeId = req.params.id;
    const vehicle = await Vehicle.find({ typeId: typeId });
    res.status(200).send(vehicle);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const editUser = async (req, res) => {
  const updates = req.body;
  try {
    let oldUser = await User.findById(req.params.id, { __v: 0 });
    let JSONoldUser = oldUser.toJSON();
    let newUser = {};
    Object.keys(JSONoldUser).forEach((val) => {
      newUser[val] = updates[val];
    });

    if (req.file && req.file.path) {
      newUser = {
        ...newUser,
        _id: req.params.id,
        personalImage: req.file.path,
      };
    } else {
      newUser = {
        ...newUser,
        _id: req.params.id,
      };
    }
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      {
        new: true,
      }
    );
    res.send(newUser);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getFaqByFaqCategoryId = async (req, res) => {
  try {
    const faq = await Faq.find({ faqCategory: req.params.id });
    res.status(200).send(faq);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getFaq = async (req, res) => {
  let faq;
  try {
    if (req.params.id !== "0") {
      faq = await Faq.find().limit(4);
    } else {
      faq = await Faq.find();
    }
    res.status(200).send(faq);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getFaqCategory = async (req, res) => {
  try {
    const faqCategory = await FaqCategory.find({});
    res.status(200).send(faqCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  forgetPassword,
  changePassword,
  getState,
  getCity,
  getUserById,
  editUser,
  upload,
  getVehicleType,
  getCompany,
  getVehicle,
  getVehicleById,
  getVehicleByCompanyId,
  getFaqByFaqCategoryId,
  getFaq,
  getFaqCategory,
  getVehicleByTypeId,
  checkOTP,
};
