import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startdate: {
      type: String,
      default: Date.now(),
    },
    enddate: {
      type: String,
    },
    assign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed"],
      default: "Pending", // Set a default value if needed
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
  },

  {
    timestamps: true,
  }
);
const task = mongoose.model("Task", taskSchema);

export default task;
