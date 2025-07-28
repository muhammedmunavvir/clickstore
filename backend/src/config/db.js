import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const mongoConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)         
    .then(() => {
     
      console.log(
        `✅ Connected to MongoDB → database: ${mongoose.connection.name}`
      );
    
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
