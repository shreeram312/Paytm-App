const express = require("express");
const router = express.Router();
const zod = require("zod");
const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../db");

module.exports = router;
