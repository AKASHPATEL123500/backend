import User from "../models/user_model.js"


export const getProfile = async (req,res)=>{
    try {
        const user = req.user
        if(!user){
            return res.status(400).json(
                {
                    success : false,
                    message : "Unauthroziation access"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : "User Profile Fatch Successfully",
                user : {
                    user
                }
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
        
        const { name , username , email} = req.body

        if(!name || !username || !email){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are required"
                }
            )
        }

        const existingUser = await User.findOne(
            {
                $or : [{ email , username }],
                _id : { $ne : req.user._id}
            }
        )

        if(existingUser){
            return res.status(400).json(
                {
                    success : false,
                    message : "Username or Email Already in use"
                }
            )
        }
        
        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {
                    name : name ,
                    username :username ,
                    email : email 
                }   
            },
            {
                new : true  
            }
        ).select("-password")

        return res.status(200).json(
            {
                success : true,
                message : "Updated Successfully",
                user : updateUser
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message  || "Update profile error"
            }
        )
    }
}