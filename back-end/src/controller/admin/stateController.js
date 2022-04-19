const State = require("../../model/admin/stateModel");
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
    const stateAdd = new State({
      stateName: req.body.stateName,
      stateImage: pathName,
    });

    await stateAdd.save();
    res.status(201).send({ msg: "State added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editState = async (req, res) => {
  const updates = req.body;
  try {
    let oldState = await State.findById(req.params.id, { __v: 0 });
    let JSONoldState = oldState.toJSON();
    let newState = {};
    Object.keys(JSONoldState).forEach((val) => {
      newState[val] = updates[val];
    });

    if (req.file &&req.file.path) {
      newState = {
        ...newState,
        _id: req.params.id,
        stateImage: req.file.path,
      };
    } else {
      newState = {
        ...newState,
        _id: req.params.id,
      };
    }
    await State.findByIdAndUpdate(
      req.params.id,
      { $set: newState },
      {
        new: true,
      }
    );
    res.send(newState);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    await state.remove();
    res.status(200).send({ msg: "State Deleted!!" });
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

const getStateById = async (req, res) => {
  try {
    const stateId = req.params.id;
    const state = await State.findById(stateId);
    res.status(200).send(state);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  addState,
  upload,
  editState,
  deleteState,
  getState,
  getStateById,
};
