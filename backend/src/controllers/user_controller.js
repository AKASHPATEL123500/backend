import User from "../models/user_model.js"


export const getProfile = async (req,res)=>{
    try {
        const user = req.user
    
        if( !user ){
            return res.status(401).json({
                success : false,
                message : "Unauthorized Access"
            })
        }

        return res.status(200).json({
            success : true,
            message : "User Profile Get Successfully",
            user:{
                _id : user._id,
                name : user.name,
                username : user.username,
                email : user.email,
                createdAt : user.createdAt
            }
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message
        })
    }
}


export const suggestedUsers = async (req,res)=>{
    try {
        const currentUser = req.user._id
        console.log("Current user : ", req.user);
        
        const suggestedUser = await User.find({
            _id : {$ne : currentUser}
        })
        .select("-password")
        .limit(5)

        console.log("Suggested user : ",suggestedUser);

        if(!suggestedUser){
            return res.status(404).json({
                success : false,
                message : "Suggested User Not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Sugessted User fatech Successfully",
            suggestedUser : {
                suggestedUser
            }
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message
        })
    }
}