const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/vehicle-rental-app", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "vehicle-rental-app",
//   })
//   .then("connected")
//   .catch("error in connection");

mongoose
  .connect(
    "mongodb+srv://meet2108:meet12345@cluster0.pagnj.mongodb.net/vehicle-rental-app",
    {
      useNewUrlParser: true,
    }
  )
  .then("connected")
  .catch("error in connection");
