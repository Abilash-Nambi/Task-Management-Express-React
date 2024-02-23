const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, " todo field is required"],
    },
    completed: {
      type: Boolean,
      required: [true, "completed field is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", toDoSchema);
