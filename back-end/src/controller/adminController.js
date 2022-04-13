const State = require("../model/admin/stateModel");
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

const addState = async (req, res) => {
  try {
    const pathName = req.file.path;
    console.log(pathName, "pathname");
    const stateAdd = new State({
      stateName: req.body.stateName,
      stateImage: pathName,
    });

    await stateAdd.save();
    res.status(201).send({msg:"State added!"});
  } catch (e) {
    res.status(400).send({ error: e.message });
    console.log(e.message)
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

module.exports = { addState,upload,getState };
