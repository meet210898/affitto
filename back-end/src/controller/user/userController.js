const State = require("../../model/admin/stateModel");
const City = require("../../model/admin/cityModel");

const getState = async (req, res) => {
  try {
    const state = await State.find({});
    res.status(200).send(state);
  } catch (e) {
    res.status(500).send({ error: e.message });
    console.log(e, "error");
  }
};

const getCity = async (req, res) => {
  try {
    const city = await City.find({});
    res.status(200).send(city);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  getState,
  getCity,
};
