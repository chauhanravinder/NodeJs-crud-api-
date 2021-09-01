const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// start express framework
const app = express();

const usersRoutes = require("./routes/users.js");

// useNewUrlParser -- for avoid daprication warning
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// db connection holder
const conn = mongoose.connection;
conn.on("open", () => {
  console.log("Database connected");
});

// for tell to express framework we want to use json format
app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({ message: "Node JS Crud using mongoose" });
// });

app.use("/users", usersRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
