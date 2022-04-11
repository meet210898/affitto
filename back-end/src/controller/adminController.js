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

    const stateAdd = new State({
      stateName: req.body.stateName,
      stateImage: pathName,
    });

    await stateAdd.save();
    res.status(201).send(stateAdd);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
//       return cb(new Error("Please select image"));
//     }
//     cb(undefined, true);
//   },
// });

module.exports = { addState, upload };
