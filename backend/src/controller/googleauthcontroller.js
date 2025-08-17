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
 
  // on production
  res.cookie("token", token, {
    httpOnly: false, // You can set this to true if you don’t need client-side access
    secure: true,   // true in production (HTTPS)
    // secure: false,   // false in localhost
    sameSite: "None", //on priduction
    // sameSite: "Lax", //on localhost
  });
   console.log(process.env.FRONTEND_URL)
  res.redirect(`https://clickstore-pi.vercel.app/auth/gettingcookie?token=${token}`);


  // local development
  // res.cookie("token", token, {
  //   httpOnly: false, // You can set this to true if you don’t need client-side access
  //   secure: false,   // true in production (HTTPS)
  //   secure: true,   // false in localhost
    
  //   sameSite: "Lax", //on localhost
  // });
  //  console.log(process.env.FRONTEND_URL)
  // res.redirect(`http://localhost:3000/auth/gettingcookie?token=${token}`);
};
