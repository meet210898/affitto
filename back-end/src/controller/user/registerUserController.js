const userRegister = require("../../model/user/registerUserModel");
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

const addRegisterUser = async (req, res) => {
  try {
    //   console.log("hellooo--------------")
    // const gstFrontImagePath = req.files["gstFrontImage"][0].path;
    // const gstBackImagePath = req.files["gstBackImage"][0].path;
    // const agencyCertificateImagePath =
    //   req.files["agencyCertificateImage"][0].path;
    // const personalImagePath = req.files["personalImage"][0].path;
    // const signatureImagePath = req.files["signatureImage"][0].path;
    // console.log(gstFrontImagePath, "gstFrontImagePath------------------");
    // const gstFrontImagePath = req.files[0].path;
    // const gstBackImagePath = req.files[1].path;
    // const agencyCertificateImagePath = req.files[2].path;
    // const personalImagePath = req.files[3].path;
    // const signatureImagePath = req.files[4].path;

    console.log(...req.body, "req.body");
    // const registerUser = new userRegister({
    //   ...req.body,
    //   //   gstFrontImage: gstFrontImagePath,
    //   //   gstBackImage: gstBackImagePath,
    //   //   agencyCertificateImage: agencyCertificateImagePath,
    //   //   personalImage: personalImagePath,
    //   //   signatureImage: signatureImagePath,
    // });

    // await registerUser.save();
    res.status(201).send({ msg: "User added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// const editCity = async (req, res) => {
//   const updates = req.body;
//   try {
//     let oldCity = await City.findById(req.params.id, { __v: 0 });
//     let JSONoldCity = oldCity.toJSON();
//     let newCity = {};
//     Object.keys(JSONoldCity).forEach((val) => {
//       newCity[val] = updates[val];
//     });

//     if (req.file && req.file.path) {
//       newCity = {
//         ...newCity,
//         _id: req.params.id,
//         cityImage: req.file.path,
//       };
//     } else {
//       newCity = {
//         ...newCity,
//         _id: req.params.id,
//       };
//     }
//     await City.findByIdAndUpdate(
//       req.params.id,
//       { $set: newCity },
//       {
//         new: true,
//       }
//     );
//     res.send(newCity);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

// const deleteCity = async (req, res) => {
//   try {
//     const city = await City.findById(req.params.id);
//     await city.remove();
//     res.status(200).send({ msg: "City Deleted!!" });
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

// const getCity = async (req, res) => {
//   try {
//     const city = await City.find({});
//     res.status(200).send(city);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

// const getCityById = async (req, res) => {
//   try {
//     const cityId = req.params.id;
//     const city = await City.findById(cityId);
//     res.status(200).send(city);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

module.exports = {
  addRegisterUser,
  upload,
};
