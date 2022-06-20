const express = require("express");
const router = new express.Router();
const {
  addState,
  upload,
  editState,
  deleteState,
  getState,
} = require("../../controller/admin/State");
const auth = require("../../middleware/auth");

router.post("/state", auth, upload.single("stateImage"), addState);
router.patch("/editState/:id", auth, upload.single("stateImage"), editState);
router.delete("/deleteState/:id", auth, deleteState);
router.get("/getState", auth, getState);

module.exports = router;
