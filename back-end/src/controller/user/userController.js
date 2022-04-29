const State = require("../../model/admin/stateModel");
const City = require("../../model/admin/cityModel");
const User = require("../../model/user/registerUserModel");
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

module.exports = {
  getState,
  getCity,
  getUserById,
  editUser,
  upload,
};
