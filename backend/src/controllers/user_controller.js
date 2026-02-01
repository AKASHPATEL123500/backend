import User from "../models/user_model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"


export const getProfile = async (req,res)=>{
    try {
        const user = req.user
        if(!user){
            return res.status(401).json(
                {
                    success : false,
                    message : "Unauthrozied Access"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : "Profile factech successfully",
                user : user
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



export const suggestedUsers = async (req,res)=>{
    try {
        const currentUser = req.user._id
        
        const suggestedUsers = await User.find(
            {
                _id : {
                    $ne : currentUser
                }
            }
        )
        .select("-password")
        
        if(!suggestedUsers){
            return res.status(401).json(
                {
                    success : false,
                    message : "Unauthrizaition acsess Suggessted User"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : "Suggested User Fatched Successfully",
                suggestedUsers
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message
            }
        )
    }
}



export const updateProfile = async (req,res)=>{
    try {
        const { name , username , email } = req.body

        const existingUser = await User.findOne(
            {
                $or : [ {name}, {username}, {email} ],
                _id : { $ne : req.user._id}
            }
        )
        if(existingUser){
            return res.status(400).json(
                {
                    success  : false,
                    meaage : "Username , name and email alreday taken"
                }
            )
        }


        const updateUser = await User.findByIdAndUpdate(
            req.user._id ,
            {
                $set : {
                    name,
                    username,
                    email
                }
            },{
                new : true
            }
        ).select("-password")


        return res.status(200).json(
            {
                success : true,
                message : "Profile Update Successfully",
                updateUser : updateUser
            }
        )
    } catch (error) {
        return res.stauts(500).json(
            {
                success : false,
                message : "Internal server error",
                error : error.message 
            }
        )
    }
}



export const updateUserAvatar = async (req,res)=>{
    try {

        const inComingAvatar = req.file?.path
        if(!inComingAvatar){
            return res.status(400).json(
                {
                    success : false,
                    message : "Avatar is missing"
                }
            )
        }

        const avatar = await uploadOnCloudinary(inComingAvatar)
        if(!avatar){
            return res.status(400).json(
                {
                    success : false,
                    message : "Error while during to upload file on cloudinary"
                }
            )
        }


        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {
                    avatar : avatar.url
                }
            },{
                new: true
            }
        ).select("-password")



        return res.status(200).json(
            {
                success : false,
                message : "Profile Avatar Updated Sucessfuly",
                user : user
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal server",
                error : error.message || "Error during update profile or uploade on cloudinary error"
            }
        )
    }
}