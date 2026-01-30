import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // file system : file ko clear karne ka kam karta hai
import dotenv from "dotenv";
dotenv.config()

// setp1. Cloudinary ko congiure karna hai ( .env ) se
cloudinary.config(
    {
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_CLOUD_SECRET_API_KEY
    }
)

// setp2. ek function banyegenge jiska use controller me hoaga
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // setp3. check this localfilepath is exist or not 
        if(!localFilePath) return null

        // step4. iss localfilepath ko cloudinar per uploade karegenge
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        console.log("Upload in cloudinary : ",result.secure_url);
        
        // setp5. file uploade ho gayi abb server se delte kar do
        fs.unlinkSync(localFilePath) // unlinkSync : jab tak file delete nhai hpoga tab tak agee nhai badhega

        return result
        
    } catch (error) {

        fs.unlinkSync(localFilePath)
        console.log("Upload on cloudinary error : ", error);
        
    }
}

export default uploadOnCloudinary