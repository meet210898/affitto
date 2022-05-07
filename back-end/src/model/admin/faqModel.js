const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  answer: {
    type: String,
    trim: true,
  },
});

const faq = mongoose.model("Faq", faqSchema);

module.exports = faq;
