import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },

  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },

  verified: { type: Boolean, default: false },
  otp: { type: Number },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
