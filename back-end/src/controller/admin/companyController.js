const Company = require("../../model/admin/companyModel");
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

const addCompany = async (req, res) => {
  try {
    const pathName = req.file.path;

    const companyAdd = new Company({
      ...req.body,
      companyLogo: pathName,
    });

    await companyAdd.save();
    res.status(201).send({ msg: "Company Added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editCompany = async (req, res) => {
  const updates = req.body;
  try {
    let oldCompany = await Company.findById(req.params.id, { __v: 0 });
    let JSONoldCompany = oldCompany.toJSON();
    let newCompany = {};
    Object.keys(JSONoldCompany).forEach((val) => {
      newCompany[val] = updates[val];
    });

    if (req.file && req.file.path) {
      newCompany = {
        ...newCompany,
        _id: req.params.id,
        companyLogo: req.file.path,
      };
    } else {
      newCompany = {
        ...newCompany,
        _id: req.params.id,
      };
    }
    await Company.findByIdAndUpdate(
      req.params.id,
      { $set: newCompany },
      {
        new: true,
      }
    );
    res.send(newCompany);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    await company.remove();
    res.status(200).send({ msg: "Company Deleted!!" });
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

// const getVehicleTypeById = async (req, res) => {
//   try {
//     const typeId = req.params.id;
//     const vehicleType = await VehicleType.findById(typeId);
//     res.status(200).send(vehicleType);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

module.exports = {
  addCompany,
  upload,
  editCompany,
  getCompany,
  deleteCompany,
};
