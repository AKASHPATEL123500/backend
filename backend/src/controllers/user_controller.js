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
                user : user
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




export const updateProfile = async ( req , res ) => {
    try {
        // jiss bhi fields ko update karna hai usko likho 
        // ye data req.body se ayega to hume nikalna padega
        const { name , username , email} = req.body

        // check all field 
        if(!name || !username || !email){
            return res.status(400).json(
                {
                    sucess : false,
                    message : "all fileds are required"
                }
            )
        }

        // find kya yaha name jo user de raha hi kya ya pahle se hi db me to nhai hai
        const existingUser = await User.findOne(
            {
                $or : [ {name}, {username} ,{email}],
                _id : { $ne : req.user._id }
            }
        )

        if(existingUser){
            return res.status(400).json(
                {
                    sucess : false ,
                    message : " Username and Name and Email alreday taken"
                }
            )
        }

        // then sab khuch sahi and name bhi diffresnt hai database ke name se to 
        // hum successfully update karwa denge

        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {
                    name : name,
                    username : username,
                    email : email
                }
            },
            {
                new : true
            }
        )

        return res.status(200).json(
            {
                success : true ,
                message : "Profile updated successfully",
                updatedUser : updateUser
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false ,
                message : "Internal Server Error",
                error : error.message || " Updated Profile Error "
            }
        )
    }
}