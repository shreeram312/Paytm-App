const express = require("express");
const mainRouter = require("./routes/index");
const colors = require("colors");
require("dotenv").config({ path: "../.env" }); // Adjust the path as needed

const app = express();

app.use("/api/v1", mainRouter);

app.get("/", function (req, res) {
  res.send("hi");
});

app.listen(process.env.PORT, function () {
  console.log(`Port is running on ${process.env.PORT}`);
});
