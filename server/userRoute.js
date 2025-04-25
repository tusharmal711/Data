import express from "express";
import { create, fetch, del } from "./userController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const publicDir = path.join(process.cwd(), "public");
const uploadDir = path.join(publicDir, "uploads");

// Check if 'public' directory exists, if not, create it
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Check if 'uploads' directory inside 'public' exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}



// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });



router.post("/user", upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]), create);
router.get("/fetch", fetch);
router.delete("/delete:id", del);

export default router;
