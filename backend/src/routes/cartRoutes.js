import express from "express";
import {
  addproduct,
  viewcart,
  removefromCart,
  updatecart,
} from "../controller/cart-controller.js";

const router = express.Router();

router.post("/add/:id", addproduct);
router.get("/view/:id",  viewcart);
router.delete("/remove/:id",  removefromCart);
router.post("/update/:id",  updatecart);

export default router; 
       