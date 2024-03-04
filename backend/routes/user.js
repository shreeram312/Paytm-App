const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../db");
const bcrypt = require("bcrypt");
const authMiddleware = require("../authMiddleware");

const signupbody = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupbody.safeParse(req.body);
    console.log(success);

    if (!success) {
      return res.status(400).json({
        msg: "Inputs invalid ",
      });
    }
    const existinguser = await User.findOne({
      userName: req.body.userName,
    });

    if (existinguser) {
      return res.json({
        msg: "Already already exists",
      });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;
    const user = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: password,
    });

    const userid = user._id;
    const token = jwt.sign(
      {
        userid,
      },
      JWT_SECRET
    );

    res.json({
      msg: "Here is your Token",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

const signinbody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { success } = signinbody.safeParse(req.body);
    console.log(success);

    const foundUser = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });

    if (foundUser) {
      const token = jwt.sign(
        {
          userId: foundUser._id,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
      return;
    }
    console.log(token);
    res.json({
      msg: "Error",
    });
  } catch (err) {
    console.log(err);
  }
});

const updatebody = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updatebody.safeParse(req.body);

  console.log(success);
  if (!success) {
    return res.status(403).json({
      msg: "no inputs bro",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    msg: "Updated Succesfully",
  });
});

module.exports = router;
