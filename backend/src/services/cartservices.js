import { getproductsModel } from "../models/productsScheama.js";
import { usermodel } from "../models/userScheama.js";
import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";

//ADD TO CART
export const addtocartservice = async (userId, productId) => {
  const product = await getproductsModel.findById({ _id: productId });

  if (!product) {
    throw new CustomErrorhandler("Product not found");
  }
  const user = await usermodel.findById({ _id: userId });
  
  if (!user) {
    throw CustomErrorhandler("User not found"); 
  }

  const existingProduct = user.cart.find(
    (item) => item._id.toString() === productId
  );

  if (existingProduct) {
    throw CustomErrorhandler("This item is already in your cart");
  }
  

  user.cart.push(product);
  await user.save();
  return user.cart;
};

//VIEW CART
  
export const viewcartservices = async (userId) => {
  const user = await usermodel.findById(userId);
  if (!user) {
    throw  CustomErrorhandler("User not found");
  }

  if (user.cart.length === 0) {
    return { data: user.cart, message: "cart is empty" };
  }
  return { data: user.cart, message: "get cart" };
}; 

//REMOVE PRODUCT FROM CART
 
export const removeCartService = async (userId, productId) => {
  const user = await usermodel.findOne({ _id: userId });

  if (!user) {
    throw CustomErrorhandler("User not found");
  }

  user.cart = user.cart.filter((item) => item._id.toString() !== productId);
  await user.save();

  return user.cart;
};
  
//UPDATE CART services

export const updatecartservice = async (userId, id, action) => {

  try {
    const user = await usermodel.findById({ _id: userId });

    if (!user) {
      throw CustomErrorhandler("user not found");
    }
    const cartItem = user.cart.find((item) => item._id.toString() === id);

    if (!cartItem) {
      throw Error("no cart item");
    }

    if (action === "increment") {
      cartItem.qty += 1;
    } else if (action === "decrement") {
      if (cartItem.qty > 1) {
        cartItem.qty -= 1;
      } else {
        throw CustomErrorhandler("cannot decrement below 1");
      }
    } else {
      throw CustomErrorhandler("invalid");
    }
    user.markModified("cart");
    await user.save();
  } catch {
    throw CustomErrorhandler("somthing went wrong");
  }
};
