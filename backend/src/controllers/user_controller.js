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