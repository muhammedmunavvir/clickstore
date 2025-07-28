import express from "express";
import { payment,orderdetailcontroller, verifypayment,    } from "../controller/payment.js"



const router = express.Router();

router.post("/payment", payment);
router.get(  "/orderdeatils/:id",orderdetailcontroller);
router.post("/verify-payment",verifypayment)


  //orderdetailcontroller


export default router;
