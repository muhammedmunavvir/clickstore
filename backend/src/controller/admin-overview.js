import { orderModel } from "../models/order-scheama.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";
//TOTEL ORDERS
export const totelorders = trycatch(async (req, res) => {
  const totelorders = await orderModel.find();
  const totelordersLenght = totelorders.length;

  res.status(201).json({
    status: "success",
    message: "totel orders",
    totelOrders: totelordersLenght,
  });
});

// TOTEL REVENUE
export const totelrevenue = trycatch(async (req, res) => {
  const orders = await orderModel.find().select("totalAmount").lean();

  const totelrevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  res.status(200).json({
    status: "success",
    message: "Total revenue calculated successfully",
    totelrevenue,
  });
});
