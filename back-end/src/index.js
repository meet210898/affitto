require("./db/database");
const cors = require("cors");
const express = require("express");
const path = require("path");
const Login = require("./router/Login");
const State = require("./router/admin/State");
const City = require("./router/admin/City");
const RegisterUser = require("./router/user/RegisterUser");
const User = require("./router/user/User");
const VehicleType = require("./router/admin/VehicleType");
const Company = require("./router/admin/Company");
const AdminUser = require("./router/admin/User");
const Vehicle = require("./router/admin/Vehicle");
const Faq = require("./router/admin/Faq");
const FaqCategory = require("./router/admin/FaqCategory");
const Booking = require("./router/admin/Booking");
const BookingUser = require("./router/user/Booking");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);

//admin
app.use(State);
app.use(City);
app.use(Login);
app.use(VehicleType);
app.use(Company);
app.use(AdminUser);
app.use(Vehicle);
app.use(FaqCategory);
app.use(Faq);
app.use(Booking);

//user
app.use(BookingUser);
app.use(RegisterUser);
app.use(User);

app.listen(port, () => {
  console.log("The server is up on port " + port);
});
