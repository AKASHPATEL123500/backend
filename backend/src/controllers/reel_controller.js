import Reel from "../models/reel_model.js"
import User from "../models/user_model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


export const uploadReel = async (req , res)=>{
    try {
        const { title , duration } = req.body
        
        const videoLocalPath = req.files?.reel?.[0]?.path

        if(!videoLocalPath){
            return res.status(400).json(
                {
                    success : false,
                    message : "file is missing"
                }
            )
        }

        const video = await uploadOnCloudinary(videoLocalPath)
        if(!video){
            return res.status(400).json(
                {
                    success : false,
                    message : "Error during file upload on cloudinary"
                }
            )
        }


        const reel = await Reel.create(
            {
                videoUrl : video.url,
                thumbnailUrl : video.url.replace(".mp4",".jpg"),
                owner : req.user._id,
                duration : video.duration || duration || 0,
                title : title || ""
            }
        )

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push : {
                    reels : reel._id
                }
            }
        )

        return res.status(201).json(
            {
                success : true,
                message : "Reel Uploaded Successfully",
                data : reel
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internl server error",
                error : error.message || "error during to upload reel error"
            }
        )
    }
}