const VehicleType = require("../../model/admin/VehicleType");
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

const addType = async (req, res) => {
  try {
    const pathName = req.file.path;
    
    const typeAdd = new VehicleType({
      ...req.body,
      typeImage: pathName,
    });

    await typeAdd.save();
    res.status(201).send({ msg: "Vehicle Type Added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editVehicleType = async (req, res) => {
  const updates = req.body;
  try {
    let oldVehicleType = await VehicleType.findById(req.params.id, { __v: 0 });
    let JSONoldVehicleType = oldVehicleType.toJSON();
    let newVehicleType = {};
    Object.keys(JSONoldVehicleType).forEach((val) => {
      newVehicleType[val] = updates[val];
    });

    if (req.file && req.file.path) {
      newVehicleType = {
        ...newVehicleType,
        _id: req.params.id,
        typeImage: req.file.path,
      };
    } else {
      newVehicleType = {
        ...newVehicleType,
        _id: req.params.id,
      };
    }
    await VehicleType.findByIdAndUpdate(
      req.params.id,
      { $set: newVehicleType },
      {
        new: true,
      }
    );
    res.send(newVehicleType);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    await vehicleType.remove();
    res.status(200).send({ msg: "Vehicle Type Deleted!!" });
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

const getVehicleTypeById = async (req, res) => {
  try {
    const typeId = req.params.id;
    const vehicleType = await VehicleType.findById(typeId);
    res.status(200).send(vehicleType);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  addType,
  upload,
  editVehicleType,
  getVehicleType,
  getVehicleTypeById,
  deleteVehicleType,
};
