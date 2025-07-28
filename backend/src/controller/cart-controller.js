import { getproductsModel } from "../models/productsScheama.js";
import { usermodel } from "../models/userScheama.js";
import {
  addtocartservice,
  removeCartService,
  updatecartservice,
  viewcartservices,
} from "../services/cartservices.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";

//ADD TO CART
export const addproduct = trycatch(async (req, res) => {
 
  const userId = req.user.id; 
 
  const productId = req.params.id; 
  const cart =  await addtocartservice(userId, productId);

  res.status(201).json({
    status: "success",
    message: "Product added to cart successfully",
    cart,
  });
});

//VIEW CART

export const viewcart = trycatch(async (req, res) => {
 
  const userId = req.user.id;

  const { message, data } = await viewcartservices(userId);

  res.status(200).json({ status: "success", message, data: data });
});
//REMOVE FROM CART

export const removefromCart = trycatch(async (req, res) => {
  const productid = req.params.id;

  const userId = req.user.id;

  const cart = removeCartService(userId, productid);

  res.status(200).json({
    message: "Product removed from cart successfully",
    cart: cart,
  });
});

//UPDATECART /INCREMENT AND DECREMENT controller

export const updatecart = trycatch(async (req, res) => {
  const { action } = req.body;
  const userId = req.user.id;

  const { id } = req.params;

  await updatecartservice(userId, id, action);
  return res
    .status(200)
    .json({ status: "success", message: "Cart updated successfully" });
});
  