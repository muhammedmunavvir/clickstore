import express from "express";
//USER SIDE ROUTE
import productRoutes from "./products-route.js";
import cartRoutes from "./cartRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import updatecart from "./cartRoutes.js";
import productHandleRouter from "./adminProductHandle.js";
//ADMIN ROUTE
import adiminRoute from "./adminroute.js";
import { userBlockAndUnblockMiddleware } from "../middlewares/userBlock-unblock.js";
import { notfoundpage } from "../controller/pagenotFound.js";

import { adminCheckmiddleware } from "../middlewares/adminCheck.js";
import myorderroute from "./myorders.js";
import googleauthroute from "./googleauthroute.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js";
 
const router = express.Router();

//USER SIDE
router.use("/auth/google", googleauthroute);
router.use("/products", productRoutes);

// router.use(userBlockAndUnblockMiddleware);

router.use("/cart",isAuthenticated, cartRoutes);
router.use("/api",isAuthenticated, paymentRoutes);
router.use("/updatecart",isAuthenticated, updatecart);
router.use("/user",isAuthenticated, myorderroute);

//ADMIN SIDE

router.use("/admin", isAuthenticated, adminCheckmiddleware, adiminRoute);
router.use("/admin", isAuthenticated, adminCheckmiddleware, productHandleRouter);


router.use("/*", notfoundpage);

export default router;
