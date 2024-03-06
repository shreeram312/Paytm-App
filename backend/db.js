const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
console.log("MongoDB URI:", process.env.MONGO_URI);

try {
  mongoose.connect(process.env.MONGO_URI);
} catch (err) {
  console.log(err);
}

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);
const Account = new mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
