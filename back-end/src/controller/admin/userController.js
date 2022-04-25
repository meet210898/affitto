const User = require("../../model/user/registerUserModel");

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  getUser,
  getUserById,
};
