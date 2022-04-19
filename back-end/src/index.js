require("./db/database");
const cors = require("cors");
const express = require("express");
const path = require("path");
const loginRouter = require("./router/loginRouter");
const stateRouter = require("./router/admin/stateRouter");
const cityRouter = require("./router/admin/cityRouter");
const registerUserRouter = require("./router/user/registerUserRouter");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);
app.use(stateRouter);
app.use(cityRouter);
app.use(loginRouter);
app.use(registerUserRouter);
app.listen(port, () => {
  console.log("The server is up on port " + port);
});
