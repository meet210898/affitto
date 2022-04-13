const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "thisismynewcourse");
    console.log("decode--------", decode);
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
    console.log(e);
  }
};

module.exports = auth;
