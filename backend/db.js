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
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
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
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);

module.exports = User;
