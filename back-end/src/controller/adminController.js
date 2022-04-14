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
    res.status(201).send({ msg: "State added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
    console.log(e.message);
  }
};

const editState = async (req, res) => {
  // const updates = Object.keys({stateImage:req.file,...req.body});
  const updates = req.body;
  // console.log(req.body, "req.body");
  // console.log(req.file, "req.file");
  // const states = [{ stateName: req.body.stateName, stateImage: req.file.path }];

  // const img = req.file.filename;
  // console.log(img, "img");
  // console.log(updates, "updates");
  // const allowedUpdates = ["stateName", "stateImage"];
  // const isValidOptions = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );

  // if (!isValidOptions) {
  //   return res.status(400).send({ error: "Invalid Update fields!" });
  // }

  try {
    let oldState = await State.findById(req.params.id, { _id: 0, __v: 0 });
    // const state = await State.findByIdAndUpdate(req.params.id);
    // console.log(getState, "getState");

    const { ...oldState1 } = oldState;
    console.log(Object.keys(oldState), "Object.keys(oldState)");
    console.log(oldState.toJSON(), "oldState");
    Object.keys(oldState.toJSON()).forEach((val) => {
      console.log("item---------", val);
      oldState[val] = updates[val];
    });
    console.log(oldState1, "oldState1");
    // updates.forEach((update) => (state[update] = req.body[update]));
    // states.forEach((update) => )
    // console.log(states, "states");
    if (req.file.path) {
      oldState = { ...oldState, stateImage: req.file.path };
    }
    console.log(oldState, "oldState");
    // await oldState.save();
    // const state = await State.findByIdAndUpdate(req.params.id,oldState)
    res.send(oldState);
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
    console.log(state, "state");
    res.status(200).send(state);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = { addState, upload, editState, deleteState, getState };
