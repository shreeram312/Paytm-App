const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
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

    console.log(user);

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId,
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

    const { userName, password } = req.body;

    const foundUser = await User.findOne({ userName });
    console.log(foundUser);

    if (!foundUser) {
      return res.status(403).json({
        msg: "Wrong Inputs or password ",
      });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    console.log(passwordMatch);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          userId: foundUser._id,
        },
        JWT_SECRET
      );

      return res.json({
        token: token,
      });
    } else {
      res.json({
        msg: "Incorrect password or Username",
      });
    }
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

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter } },
      { lastName: { $regex: filter } },
      { userName: { $regex: filter } },
    ],
  });

  const userId = req.userId;
  const filteredUsers = userId
    ? users.filter((user) => user._id.toString() !== userId)
    : users;

  console.log(filteredUsers);
  res.json({
    users: filteredUsers.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
