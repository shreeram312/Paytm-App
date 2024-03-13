const express = require("express");
const authMiddleware = require("../authMiddleware");
const { User, Account } = require("../db");
const router = express.Router();
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    console.log(account);
    if (!account) {
      return res.status(404).json({ error: "Account not found for the user" });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error("Error retrieving account balance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;
  if (req.userId == to) {
    return res.json({
      msg: "Not possible bro coz u are same",
    });
  }

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insuffucient Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  if (req.userId == to) {
    res.json({
      msg: "Not possible bro coz u are same",
    });
  }
  res.json({
    msg: "Transfer Successfull",
  });
});

module.exports = router;
