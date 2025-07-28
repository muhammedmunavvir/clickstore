import { orderModel } from "../models/order-scheama.js";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchProductById,
  fetchFeaturedProducts,
} from "../services/product-services.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";

// Fetch all products
export const getproducts = trycatch(async (req, res) => {
  const allProducts = await fetchAllProducts();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: allProducts,
  });
});

export const category = trycatch(async (req, res) => {
  const { category } = req.query;

  const productsByCategory = await fetchProductsByCategory(category);
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: productsByCategory,
  });
});

export const getproductsbyId = trycatch(async (req, res) => {
  const { id } = req.params;
  const product = await fetchProductById(id);
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
});

//FEATURED PRODUCTS
export const featuredproducts = trycatch(async (req, res) => {
  const featuredProducts = await fetchFeaturedProducts();
  res.status(200).json({
    status: "success",
    message: "Featured products fetched successfully",
    data: featuredProducts,
  });
});
export const orderstatusupdate = trycatch(async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    } 

    res.status(200).json({ message: "Status updated", data: updatedOrder });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
