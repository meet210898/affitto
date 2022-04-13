require("./db/database");
const cors = require("cors");
const express = require("express");
const path = require("path");
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(adminRouter);
app.use(userRouter);
app.listen(port, () => {
  console.log("The server is up on port " + port);
});
