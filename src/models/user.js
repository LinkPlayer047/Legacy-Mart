import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user","admin"], default: "user" },
  status: { type: String, enum: ["active","blocked"], default: "active" },
  verified: { type: Boolean, default: false },
  otp: Number,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User; // ✅ default export
