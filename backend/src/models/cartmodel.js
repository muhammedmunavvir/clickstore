  import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true
  },
  qty: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

export const CartModel = mongoose.model("Cart", cartItemSchema);
