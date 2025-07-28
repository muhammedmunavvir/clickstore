import mongoose from "mongoose";


  const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },  // No password for Google users
  googleId: { type: String, unique: true, required: true },
  googlepictureurl: { type: String },
  age: { type: Number },
  role: { type: String, default: "user" },
  cart: { type: Array, default: [] },
  status: { type: String }, 
  myorders: { type: String },
}, { timestamps: true });


export const usermodel = mongoose.model("users", userSchema);
 