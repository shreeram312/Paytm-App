const express = require("express");
const mainRouter = require("./routes/index");
const colors = require("colors");
require("dotenv").config({ path: "../.env" }); // Adjust the path as necessary
// Adjust the path as needed
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.get("/", function (req, res) {
  res.send("hi");
});

app.listen(process.env.PORT, function () {
  console.log(`Port is running on ${process.env.PORT}`);
});
