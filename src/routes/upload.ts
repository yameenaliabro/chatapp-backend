import express from "express";
import { uploadImage } from "../controllers/upload";
import { uploadImageMulter } from "../util/multer";
const upload = express.Router();

upload.post('/upload', uploadImageMulter.single('file'), uploadImage);

export default upload