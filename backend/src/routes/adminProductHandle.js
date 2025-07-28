import express from "express";
const productHandleRouter = express.Router();

import {
  addNewProduct,
  updateProduct,
  deleteproduct,
  Gettotalorders,
} from "../controller/admin-controller.js";
import { upload } from "../config/multure.js";
import { orderstatusupdate } from "../controller/product-controller.js";

productHandleRouter.post("/newProduct", upload.single("image"), addNewProduct);
productHandleRouter.patch("/updateProduct/:id", updateProduct);
productHandleRouter.delete("/deleteProduct/:id", deleteproduct);
productHandleRouter.get("/gettotalorders",Gettotalorders,)
productHandleRouter.patch("/update-order-status/:id",orderstatusupdate)
  
export default productHandleRouter;
    