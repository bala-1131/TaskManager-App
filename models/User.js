const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
  },
  role: {
    type: String,
    trim: true,
    required: [true, "Role is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
});

userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);
