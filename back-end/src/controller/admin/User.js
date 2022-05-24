const User = require("../../model/user/RegisterUser");
const { VerifyUserWhen } = require("../../Email/email");

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const editUser = async (req, res) => {
  const status = req.body;
  try {
    let user = await User.findByIdAndUpdate(req.params.id, {
      $set: { isVerify: status.isVerify },
    });
    VerifyUserWhen(user.email, user.name);
    res.send(user);
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
  editUser,
};
