const jwt = require("jsonwebtoken");
const User = require("../model/user/RegisterUser");

const auth = async (req, res, next) => {
  try {
    const token = req.header("AuthorizationUser");
    const decode = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decode._id,
      // "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(500).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
