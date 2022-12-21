const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', TaskSchema);