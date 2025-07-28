import express from "express";
import {
  category,
  featuredproducts,
  getproducts,
  getproductsbyId,
} from "../controller/product-controller.js";

const router = express.Router();

router.get("/all", getproducts);
router.get("/category", category);
router.get("/featured", featuredproducts);
router.get("/:id", getproductsbyId);
  
export default router;   
     