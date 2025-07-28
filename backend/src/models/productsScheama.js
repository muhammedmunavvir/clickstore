import mongoose from "mongoose";

export const getproductsScheama = new mongoose.Schema({
  id: { type: String },
  heading: { type: String },
  discription: { type: String },
  url: { type: String },
  catogory: { type: String },
  price: { type: Number },
  rating: { type: Number },
  qty: { type: Number },
  measurement:{type:String}
});

export const getproductsModel = new mongoose.model(
  "products",
  getproductsScheama
);
 