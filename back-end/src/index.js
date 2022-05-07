require("./db/database");
const cors = require("cors");
const express = require("express");
const path = require("path");
const loginRouter = require("./router/loginRouter");
const stateRouter = require("./router/admin/stateRouter");
const cityRouter = require("./router/admin/cityRouter");
const registerUserRouter = require("./router/user/registerUserRouter");
const userRouter = require("./router/user/userRouter");
const vehicleTypeRouter = require("./router/admin/vehicleTypeRouter");
const companyRouter = require("./router/admin/companyRouter");
const adminUserRouter = require("./router/admin/userRouter");
const vehicleRoutter = require("./router/admin/vehicleRouter");
const faqRouter = require("./router/admin/faqRouter");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);
//admin
app.use(stateRouter);
app.use(cityRouter);
app.use(loginRouter);
app.use(vehicleTypeRouter);
app.use(companyRouter);
app.use(adminUserRouter);
app.use(vehicleRoutter);
app.use(faqRouter);
//user
app.use(registerUserRouter);
app.use(userRouter);
app.listen(port, () => {
  console.log("The server is up on port " + port);
});
