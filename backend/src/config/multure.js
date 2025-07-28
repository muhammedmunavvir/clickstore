import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,       // example: "your-cloud-name"
  api_key: process.env.CLOUDINARY_API_KEY,       // example: "1234567890"
  api_secret: process.env.CLOUDINARY_SECRET, // example: "your-api-secret"
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // optional
  },
});

// Export the upload middleware
export const upload = multer({ storage });
