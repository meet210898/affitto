const Vehicle = require("../../model/admin/vehicleModel");
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

const addVehicle = async (req, res) => {
  try {
    const vehicleAdd = new Vehicle({
      ...req.body,
      vehicleImage: req.files["vehicleImage"][0].path,
      rcImage: req.files["rcImage"][0].path,
      pucImage: req.files["pucImage"][0].path,
      insuranceImage: req.files["insuranceImage"][0].path,
    });
    await vehicleAdd.save();
    res.status(201).send({ msg: "Vehicle Added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
    console.log(e, "error");
  }
};

const editVehicle = async (req, res) => {
  const updates = req.body;
  let updateFields = {};
  let newVehicle = {};
  const fields = ["pucImage", "rcImage", "vehicleImage", "insuranceImage"];
  
  try {
    let oldVehicle = await Vehicle.findById(req.params.id, { __v: 0 });
    let JSONoldVehicle = oldVehicle.toJSON();

    Object.keys(req.files).forEach((field) => {
      if (fields.includes(field)) {
        updateFields[field] = req.files[field][0].path;
      }
    });

    Object.keys(JSONoldVehicle).forEach((val) => {
      newVehicle[val] = updates[val];
    });

    if (Object.keys(updateFields).length > 0) {
      newVehicle = {
        ...newVehicle,
        _id: req.params.id,
        ...updateFields,
      };
    } else {
      newVehicle = {
        ...newVehicle,
        _id: req.params.id,
      };
    }
    
    await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: newVehicle },
      {
        new: true,
      }
    );
    res.send(newVehicle);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    await vehicle.remove();
    res.status(200).send({ msg: "Vehicle Deleted!!" });
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

module.exports = {
  addVehicle,
  upload,
  getVehicle,
  editVehicle,
  deleteVehicle,
  getVehicleById,
};
