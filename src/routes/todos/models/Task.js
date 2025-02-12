import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", TaskSchema);
