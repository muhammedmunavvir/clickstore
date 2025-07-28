import { orderModel } from "../models/order-scheama.js";
import { usermodel } from "../models/userScheama.js"; // user model
import { trycatch } from "../utilities/asycErrorHandling.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

export const myorders = trycatch(async (req, res) => {
  const userId = req.user.id;
  const myorders = await orderModel.find({ userId }).sort({ createdAt: -1 });

  res.status(201).json({
    status: "success",
    message: "myorders",
    data: myorders,
  });
});

export const cancelorder = trycatch(async (req, res) => {
  console.log(req.user, "requser");
  const { orderId } = req.params;

  // Update order status to Cancelled
  const order = await orderModel.findOneAndUpdate(
    { orderId: orderId },
    { $set: { status: "Cancelled" } },
    { new: true } // return updated document
  );

  if (!order) {
    return res.status(404).json({ status: "fail", message: "Order not found" });
  }

  // Fetch user email and phone from DB using userId from req.user
  const user = await usermodel.findById(req.user.id);
  if (!user || !user.email) {
    return res.status(400).json({ status: "fail", message: "User email not found" });
  }

  // Send cancellation email to user
  await sendOrderCancelEmail(user.email, order.orderId, order.totalAmount);

  // Send cancellation SMS to admin (change to user.phone if you want to notify user)
  await sendOrderCancelSMS("+919188859297", order);

  res.status(200).json({ status: "success", message: "order Cancelled" });
});

// Email sending function
const sendOrderCancelEmail = async (userEmail, orderId, totalAmount) => {
  console.log("sendOrderCancelEmail");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPONY_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.COMPONY_EMAIL,
      to: userEmail,
      subject: "Order Cancelled",
      html: `
        <h2>Your order has been cancelled!</h2>
        <p>Order ID: ${orderId}</p>
        <p>Total Amount: ₹${totalAmount}</p>
        <p>We are sorry for the inconvenience.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to cancel:", userEmail);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// SMS sending function
const sendOrderCancelSMS = async (toNumber, order) => {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const messageBody = `🛒 Order has been cancelled!
Order ID: ${order.orderId}
Name: ${order.shippingAddress.address}
Phone: ${order.shippingAddress.mobilenumber}
Total: ₹${order.totalAmount}`;

    const message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_FROM_NUMBER,
      to: toNumber,
    });

    console.log("✅ SMS sent:", message.sid);
  } catch (error) {
    console.error("❌ Failed to send SMS:", error);
  }
};
