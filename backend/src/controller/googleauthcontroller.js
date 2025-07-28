import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: "error", message: "User not authenticated" });
  }

  const { role, _id, googlepictureurl,email } = req.user;

  const token = jwt.sign(
    { id: _id, role, picture: googlepictureurl,email }, // 👈 include picture
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
 
  res.cookie("token", token, {
    httpOnly: false, // You can set this to true if you don’t need client-side access
    secure: true,   // true in production (HTTPS)
    sameSite: "None",
  });
 
  res.redirect(`https://clickstore-pi.vercel.app/auth/gettingcookie?token=${token}`);
};
