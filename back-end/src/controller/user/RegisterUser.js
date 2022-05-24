const userRegister = require("../../model/user/RegisterUser");
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
    console.log(req.files["agencyCertificateImage"], "req.file");
    const gstFrontImagePath = req.files["gstFrontImage"][0].path;
    const gstBackImagePath = req.files["gstBackImage"][0].path;
    const agencyCertificateImagePath =
      req.files["agencyCertificateImage"][0].path;
    const personalImagePath = req.files["personalImage"][0].path;
    const signatureImagePath = req.files["signatureImage"][0].path;
    const data = req.body;
    console.log(gstFrontImagePath, "gstFrontImagePath", {
      data,
      gstFrontImage: gstFrontImagePath,
      gstBackImage: gstBackImagePath,
      agencyCertificateImage: agencyCertificateImagePath,
      personalImage: personalImagePath,
      signatureImage: signatureImagePath,
    });

    const registerUser = new userRegister({
      ...data,
      gstFrontImage: gstFrontImagePath,
      gstBackImage: gstBackImagePath,
      agencyCertificateImage: agencyCertificateImagePath,
      personalImage: personalImagePath,
      signatureImage: signatureImagePath,
    });

    await registerUser.save();
    res.status(201).send({ msg: "User added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const addUser = async (req, res) => {
  try {
    const pathName = req.file.path;
    const userData = req.body;
    const registerUser = new userRegister({
      ...userData,
      personalImage: pathName,
    });

    await registerUser.save();
    res.status(201).send({ msg: "User added!" });
  } catch (e) {
    console.log(e.message, "error");
    res.status(400).send({ error: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const userLogin = await userRegister.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await userLogin.generateAuthToken();
    res.status(200).send({ token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  addRegisterUser,
  upload,
  addUser,
  loginUser,
};
