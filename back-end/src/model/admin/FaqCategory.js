const mongoose = require("mongoose");

const faqCategorySchema = new mongoose.Schema({
  faqCategory: {
    type: String,
    trim: true,
  },
});

const faqCategory = mongoose.model("FaqCategory", faqCategorySchema);

module.exports = faqCategory;
