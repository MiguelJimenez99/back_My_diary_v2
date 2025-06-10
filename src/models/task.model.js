const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    date: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
