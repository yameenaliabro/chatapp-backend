//@ts-ignore
import * as cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_SECRET_KEY;

cloudinary.v2.config({
    cloud_name,
    api_key,
    api_secret,
});

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};


const uploadImageCloudinary = async (image: string) => {
    try {
        //@ts-ignore
        const result: any = await cloudinary.v2.uploader.upload(`${image}`, options);
        const secureURL = result.secure_url;
        return secureURL;
    } catch (error: any) {
        throw error;
    }
};

export default uploadImageCloudinary;