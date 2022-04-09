const jwt = require("jsonwebtoken");
const Login = require("../model/login");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "thisismynewcourse");
    const login = await Login.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!login) {
      throw new Error();
    }

    req.login = login;
    next();
  } catch (e) {
    res.status(500).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
