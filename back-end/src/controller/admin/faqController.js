const Faq = require("../../model/admin/faqModel");

const addFaq = async (req, res) => {
  try {
    const faqAdd = new Faq(req.body);

    await faqAdd.save();
    res.status(201).send({ msg: "Faq added!" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editFaq = async (req, res) => {
  console.log(req.body, "req.body");
  try {
    let faq = await Faq.findByIdAndUpdate(req.params.id, req.body);
    res.send(faq);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    await faq.remove();
    res.status(200).send({ msg: "Faq Deleted!!" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getFaq = async (req, res) => {
  try {
    const faq = await Faq.find({});
    res.status(200).send(faq);
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
  addFaq,
  getFaq,
  editFaq,
  deleteFaq,
};
