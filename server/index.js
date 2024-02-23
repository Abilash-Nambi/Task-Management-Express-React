const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const todos = require("./routes/todo");
const connectDb = require("./config/db");

connectDb();
app.use("/api/todo", todos);
app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
