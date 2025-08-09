import { CartModel } from "../models/cartmodel.js";
import { getproductsModel } from "../models/productsScheama.js";
import { usermodel } from "../models/userScheama.js";
import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";

export const addtocartservice = async (userId, productId) => {
  const product = await getproductsModel.findById(productId);
  if (!product) throw CustomErrorhandler("Product not found");

  const existing = await CartModel.findOne({ userId, productId });
  if (existing) throw CustomErrorhandler("Product already in cart");

  const newItem = new CartModel({ userId, productId, qty: 1 });
  await newItem.save();

  return newItem;
};

//VIEW CART
  

export const viewcartservices = async (userId) => {
 
  const cartItems = await CartModel.find({ userId }).populate("productId");
 
 
  if (!cartItems || cartItems.length === 0) {
    return { data: [], message: "Cart is empty" };
  }

  // Format to include product data with qty
  const formatted = cartItems.map((item) => ({
    product: item.productId,
    qty: item.qty,  
  }));

  return { data: formatted, message: "Cart fetched" };
};

//REMOVE PRODUCT FROM CART
 
export const removeCartService = async (userId, productId) => {
  const deleted = await CartModel.deleteOne({ userId, productId });

  if (deleted.deletedCount === 0) {
    throw CustomErrorhandler("Item not found in cart");
  }

  return { message: "Item removed from cart" };
};
  
//UPDATE CART services
export const updatecartservice = async (userId, productId, action) => {
  try {
    // Each cart item is a document, so find by userId and productId
    const item = await CartModel.findOne({ userId, productId });

    

    if (!item) {
      throw CustomErrorhandler("Cart item not found");
    }

    if (action === "increment") {
      item.qty += 1;
    } else if (action === "decrement") {
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        throw CustomErrorhandler("Cannot decrement below 1");
      }
    } else {
      throw CustomErrorhandler("Invalid action");
    }

    await item.save();

    return { success: true, cartItem: item };
  } catch (err) {
    throw CustomErrorhandler(err.message || "Something went wrong");
  }
};

