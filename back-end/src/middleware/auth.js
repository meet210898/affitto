const jwt = require("jsonwebtoken");
const User = require("../model/Login");

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"), "request check");
    const token = req.header("Authorization"); 
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
