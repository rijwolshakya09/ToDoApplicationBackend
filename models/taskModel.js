const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Model Collection Create
const Task = new mongoose.Schema({
  task_name: {
    type: String,
  },
  task_description: {
    type: String,
  },
  task_status: {
    type: String,
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", Task);
