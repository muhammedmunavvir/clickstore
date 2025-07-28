import { usermodel } from "../models/userScheama.js";

export const userBlockAndUnblockMiddleware = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await usermodel.findById({ _id: id });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    if (user.status === "noActive") {
      return res.status(403).json({
        status: "fail",
        message: "Your account is blocked. Please contact support.",
      });
    }

    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};
