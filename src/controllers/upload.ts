import express from "express"
import uploadImageCloudinary from "../util/cloudinary";

export const uploadImage = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const filePath = req.file.path
        const url = await uploadImageCloudinary(filePath)
        res.json({ filePath: url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}