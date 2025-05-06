const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
