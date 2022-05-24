const express = require("express");
const router = express.Router();
const {
  addFaqCategory,
  getFaqCategory,
  deleteFaqCategory,
  editFaqCategory,
} = require("../../controller/admin/FaqCategory");
const auth = require("../../middleware/auth");

router.post("/addFaqCategory", auth, addFaqCategory);
router.patch("/editFaqCategory/:id", auth, editFaqCategory);
router.delete("/deleteFaqCategory/:id", auth, deleteFaqCategory);
router.get("/getFaqCategory", auth, getFaqCategory);
// router.get("/getStateById/:id", getStateById);

module.exports = router;
