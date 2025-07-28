import express from "express";
import {
  allusers,
  blockUnblockuser,
  productsBycategory,
  productsById,
  userDetails,
} from "../controller/admin-controller.js";
import { totelorders, totelrevenue } from "../controller/admin-overview.js";
const adminrouter = express.Router();

// adminrouter.use(adminCheckmiddleware);

adminrouter.get("/allusers", allusers); 
adminrouter.get("/userDetails/:id", userDetails);   
adminrouter.patch("/blockAndunblock/:id", blockUnblockuser);

adminrouter.get("/products/category", productsBycategory); 
adminrouter.get("/product/:id", productsById);
 
adminrouter.get("/overview/totelorders", totelorders);
adminrouter.get("/totelrevenue", totelrevenue);
  
// adminRouter.get("/orders", manageOrders);
// adminRouter.get("/users", manageUsers); 

export default adminrouter;  
