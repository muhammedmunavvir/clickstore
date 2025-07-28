
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId:{type:String,required:true},
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Order confirmed", "Shipped", "Completed", "Cancelled","Packing"],
    default: "Order confirmed",
  },
  createdAt: { type: Date, default: Date.now },
  products: { type: Array },

  shippingAddress: {
    address: { type: String, required: true },
    housename: { type: String, required: true },
    place: { type: String },
    postOffice: { type: String },
    district: { type: String },
    state: { type: String, required: true },
    pincode: { type: String },
    mobilenumber: { type: String },
    email: { type: String },
  },
 
  paymentmethod: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
});

export const orderModel = mongoose.model("orders", orderSchema);
