const express = require("express");
const router = express.Router();

router.post("/useraccoumt", (req, res) => {
  res.send({
    msg: "fuj",
  });
});

module.exports = router;
