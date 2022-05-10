const State = require("../../model/admin/stateModel");
const City = require("../../model/admin/cityModel");
const User = require("../../model/user/registerUserModel");
const VehicleType = require("../../model/admin/vehicleTypeModel");
const Company = require("../../model/admin/companyModel");
const Vehicle = require("../../model/admin/vehicleModel");
const Faq = require("../../model/admin/faqModel");
const FaqCategory = require("../../model/admin/faqCategoryModel");

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
const getState = async (req, res) => {
  try {
    const state = await State.find({});
    res.status(200).send(state);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getCity = async (req, res) => {
  try {
    const city = await City.find({});
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
  try {
    const company = await Company.find({});
    res.status(200).send(company);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.find({});
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
};
