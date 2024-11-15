import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model("Car", carSchema);
export default Car;
