import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
 
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
   
 
    req.user = decoded;
    next();
  } catch (err) {
      console.error("❌ JWT verification failed:", err.message);

    return res.status(403).json({ message: "Invalid token" });
  }
};
