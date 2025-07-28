import mongoose from "mongoose";
import { getproductsModel } from "../models/productsScheama.js";
import { usermodel } from "../models/userScheama.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";
import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";
import { orderModel } from "../models/order-scheama.js";
//GET ALL USERS

export const allusers = trycatch(async (req, res) => {
  const users = await usermodel.find(
    { role: { $ne: "admin" } },
    { password: 0 } //IT EXCLUDE THE PASSWORD
  );

  if (!users || users.length === 0) {
    throw new CustomErrorhandler("No users found!", 404);
  }

  return res
    .status(200)
    .json({ status: "success", message: "get all users", users });
});

//GET SPECIFIC USER DETAILS
export const userDetails = trycatch(async (req, res) => {
  const { id } = req.params;

  const user = await usermodel.find({ _id: id });
  return res
    .status(200)
    .json({ status: "success", message: "got user details", data: user });
});

//USER BLOCK/UNBLOCK

export const blockUnblockuser = trycatch(async (req, res) => {
  const { id } = req.params;

  const { action } = req.body;
  console.log(action);

  if (action === "block") {
    await usermodel.findByIdAndUpdate(id, {
      status: "noActive",
    });
    return res.status(200).json({ status: "success", message: "user blocked" });
  } else if (action === "unblock") {
    console.log(action);
    await usermodel.findByIdAndUpdate(id, {
      status: "Active",
    });
    return res
      .status(200)
      .json({ status: "successes", message: "user unblock" });
  }
});

//PRODUCTS BY CATEGORY

export const productsBycategory = trycatch(async (req, res) => {
  const { category } = req.query;

  const product = await getproductsModel.find({ catogory: category });

  res.status(200).json({
    status: "success",
    message: "got all products by category",
    data: product,
  });
});

//PRODUCTS BY ID

export const productsById = trycatch(async (req, res) => {
  const { id } = req.params;

  const product = await getproductsModel.find({ _id: id });

  res
    .status(201)
    .json({ status: "success", message: "successfully", data: product });
});

//CREATE NEW PRODUCT

export const addNewProduct = trycatch(async (req, res) => {


  if (!req.file) {
    throw CustomErrorhandler("Image upload failed");
  }

  const productDetails = {
      heading: req.body.heading,
      discription: req.body.discription,
      catogory: req.body.catogory,
      price: Number(req.body.price),
      rating: Number(req.body.rating) || 0,
      qty: Number(req.body.qty) || 0,
      url: req.file.path,   // Cloudinary URL
      measurement:req.body.measurement
    };

  const product = await getproductsModel.create(productDetails);

  if (!product) {
    throw CustomErrorhandler("failed to add product");
  }

  return res
    .status(201)
    .json({ status: "success", message: "product created successfully" });
});


//UPDATE PRODUCT

export const updateProduct = trycatch(async (req, res) => {
  console.log(req.body);
  const updateddata = req.body;

  console.log(updateddata);
  const { id } = req.params;

  await getproductsModel.updateOne({ _id: id }, { $set: { ...updateddata } });

  res
    .status(200)
    .json({ status: "success", message: "successfully update the product" });

  res
    .status(500)
    .json({ status: "fail", message: "failed to update the products" });
});
 
//DELETE PRODUCT

export const deleteproduct = trycatch(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  await getproductsModel.deleteOne({ _id: id });
  res.status(200).json({ status: "success", message: "deleted successfully" });
});

export const Gettotalorders = trycatch(async (req, res) => {
  console.log(req.url);

  const Totalorders = await orderModel.find().sort({createdAt:-1})
  console.log(Totalorders);

  return res
    .status(201)
    .json({ status: "success", message: "successfully", data: Totalorders });
});
