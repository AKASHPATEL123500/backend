import Reel from "../models/reel_model.js"
import User from "../models/user_model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import mongoose from "mongoose"

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



export const getAllReels = async (req,res) =>{
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id)
        const reels = await Reel.aggregate(
            [
                // Stage 1. filter data
                {
                    $match : {
                        isPublished : true,
                        isDeleted : false,
                        isBlocked : false
                    }
                },


                // Stage 2. marge data using $lookup reel info + user info
                {
                    $lookup:{
                        from : "users",
                        localField : "owner",
                        foreignField : "_id",
                        as : "autherData"
                    }
                },

                // Stage 3. unwind
                {
                    $unwind : "$autherData"
                },

                // Stage 4. lateset reel fisrt
                {
                    $sort : {
                        createdAt : -1
                    }
                },

                // Stage 5. show likes comment and share and number not show id
                {
                    $addFields : {
                        likeCount : {
                            $size : {
                                $ifNull : ["$likes",[]]
                            }
                        },
                        commentsCount : {
                            $size : {
                                $ifNull : ["$comments",[]]
                            }
                        },
                        isLiked : {
                            $cond : {
                                if : {
                                    $in : [
                                        userId,
                                        {
                                            $ifNull : ["$likes",[]]
                                        }
                                    ]
                                },
                                then : true,
                                else : false
                            }
                        }
                    }
                },

                // Stage 6. show all info 
                {
                    $project : {
                        videoUrl : 1,
                        thumbnailUrl : 1,
                        title : 1,
                        viewsCount : 1,
                        likeCount : 1,
                        isLiked : 1,
                        commentsCount : 1,
                        sharesCount : 1,
                        savedBy : 1,
                        reports : 1,
                        createdAt : 1,

                        auther : {
                            _id : "$autherData._id",
                            name : "$autherData.name",
                            username : "$autherData.username",
                            createdAt : "$autherData.createdAt",
                            updatedAt : "$autherData.updatedAt"
                        }
                    }
                }
            ]
        )

        return res.status(200).json(
            {
                success : true,
                message : "All reels fatch successfully",
                totalReels : reels.length,
                data : reels
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal server error",
                error : error.message
            }
        )
    }
}