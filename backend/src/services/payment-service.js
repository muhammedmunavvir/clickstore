
import { orderModel } from "../models/order-scheama.js";

// GET ORDER DETAILS

export const orderdetailsService = async (userId) => {
  const latestOrder = await orderModel
    .findOne({ userId })
    .populate("products.productId")
    .sort({ createdAt: -1 });

  if (!latestOrder) {
    throw new Error("No orders found for this user");
  }

  return latestOrder;
};
 


   