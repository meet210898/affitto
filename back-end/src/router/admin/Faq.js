const express = require("express");
const router = new express.Router();
const {
  addFaq,
  getFaq,
  deleteFaq,
  editFaq,
} = require("../../controller/admin/Faq");
const auth = require("../../middleware/auth");

router.post("/addFaq", auth, addFaq);
router.patch("/editFaq/:id", auth, editFaq);
router.delete("/deleteFaq/:id", auth, deleteFaq);
router.get("/getFaq", auth, getFaq);

module.exports = router;
