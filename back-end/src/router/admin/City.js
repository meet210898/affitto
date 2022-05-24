const express = require("express");
const router = new express.Router();
const {
  addCity,
  upload,
  editCity,
  deleteCity,
  getCity,
  getCityById,
} = require("../../controller/admin/City");
const auth = require("../../middleware/auth");

router.post("/addCity", auth, upload.single("cityImage"), addCity);
router.patch("/editCity/:id", auth, upload.single("cityImage"), editCity);
router.delete("/deleteCity/:id", auth, deleteCity);
router.get("/getCity", auth, getCity);
router.get("/getCityById/:id", getCityById);

module.exports = router;
