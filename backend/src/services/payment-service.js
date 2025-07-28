// import { usermodel } from "../models/userScheama.js";
// // import { shippingaddresmodel } from "../models/order-scheama.js";


import { orderModel } from "../models/order-scheama.js";

// export const processPayment = async (userId, addressDetails, paymentmethod) => {
//   console.log(req.url,"proccess payament")
//   const { recipientName, addressLine, city, state, pincode, country, phone } =
//     addressDetails;

//   // CREATE NEW SHIPPING ADDRES
//   const newAddress = new orderModel({
//     recipientName,
//     addressLine,
//     city,
//     state, 
//     pincode,
//     country,
//     phone,
//     createdAt: Date.now(),
//   });

//   const user = await usermodel.findById({ _id: userId });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   let cart = user.cart;

//   const orderproducts = JSON.parse(JSON.stringify(cart));

//   if (!cart || cart.length === 0) {
//     throw new Error("Cart is empty"); 
//   }
//    console.log(cart,"cartttttttttttttttttttttttttttttttttttttttttttt")
// const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
// console.log(totalAmount,"tooooooooooooooooooooooooooooooooooooooooooooooooooooo")
//  // Save the new order to the database
//  const newOrder = new orderModel({
//   userId: userId,
//   shippingAddress: newAddress,
//   products: orderproducts,
//   totalAmount: totalAmount,
//   paymentmethod: paymentmethod,
//   createdAt: Date.now(),
// });
// await newOrder.save()
//   cart.length = 0; 
//   user.markModified("cart");
//   await user.save();

//   return { totalAmount, message: "Payment successfully processed" };
// };

// GET ORDER DETAILS

export const orderdetailsService = async (userId) => {
  const uId = userId;

  const user = await orderModel.find({ userId: uId });

  if (!user) { 
    throw new Error("user not found");
  }

  return user;
};
   