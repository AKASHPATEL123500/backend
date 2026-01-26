import jwt from "jsonwebtoken"
import User from "../models/user_model.js"

export const verifyToekn = async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer","")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token missing"
            })
        }
        const decodeToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)

        const user = await User.findById(decodeToken?._id).select("-password")

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invaild Token User Not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("JWT TOKEN VERIFY ERROR : ",error.message);
        return res.status(500),json({
            success : false,
            message : "Internal Server Error"
        })
    }
}