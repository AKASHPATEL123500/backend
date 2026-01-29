import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // file sytem path ko clear karne ke liye
import dotenv from "dotenv"
dotenv.config()

cloudinary.config(
    {
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_CLOUD_SECRET_API_KEY
    }
)

console.log("Api key : ",process.env.CLOUDINARY_API_KEY);
console.log("Api key : ",process.env.CLOUDINARY_CLOUD_NAME);
console.log("Api key : ",process.env.CLOUDINARY_CLOUD_SECRET_API_KEY);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // 1. agr file path nhai hai to return null,
        if(!localFilePath) return null ;

        // 2. upload tha file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto" // automatic file ko detect kar lega ki image hai ya video
        })

        // 3. file upload ho gayai abb servre se delte kar do
        console.log("File Upload On Cloudinary : ",response.url);

        fs.unlinkSync(localFilePath) // sync iss liye taki jab tak file delete nhai ho jati tab tak agge nahi badhega

        return response


    } catch (error) {
        // Agar upload fail ho gaya, tab bhi server se file delete karni padegi
        // Taaki corrupt files server par na padi rahein
        fs.unlinkSync(localFilePath)
        console.log("file uploade on cloudinary error : ", error);
        return null
    }
}

export default uploadOnCloudinary