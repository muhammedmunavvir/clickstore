import express from "express"
import { cancelorder, myorders } from "../controller/myorderscontroller.js"
const myorderroute=express.Router()


myorderroute.get("/myorders",myorders)
myorderroute.patch("/cancelorder/:orderId",cancelorder)

export default myorderroute