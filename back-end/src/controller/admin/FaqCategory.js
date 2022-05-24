const FaqCategory = require("../../model/admin/FaqCategory");

const addFaqCategory = async (req, res) => {
  try {
    const faqCategoryAdd = new FaqCategory(req.body);

    await faqCategoryAdd.save();
    res.status(201).send({ msg: "Faq Category added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editFaqCategory = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const faqCategory = await FaqCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(faqCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteFaqCategory = async (req, res) => {
  try {
    const faqCategory = await FaqCategory.findById(req.params.id);
    await faqCategory.remove();
    res.status(200).send({ msg: "Faq Category Deleted!!" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getFaqCategory = async (req, res) => {
  try {
    const faqCategory = await FaqCategory.find({});
    res.status(200).send(faqCategory);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// const getStateById = async (req, res) => {
//   try {
//     const stateId = req.params.id;
//     const state = await State.findById(stateId);
//     res.status(200).send(state);
//   } catch (e) {
//     res.status(500).send({ error: e.message });
//   }
// };

module.exports = {
  addFaqCategory,
  getFaqCategory,
  deleteFaqCategory,
  editFaqCategory,
};
