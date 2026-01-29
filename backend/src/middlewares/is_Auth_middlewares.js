import jwt from "jsonwebtoken"
import User from "../models/user_model.js"

export const verifyToken = async (req,res,next)=>{
    try {
        // setp 1 token find from cookie or headers
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ","")
        if(!token){
            return res.status(404).json(
                {
                    success : false,
                    message : "Token Not found"
                }
            )
        }
        
        // setp2. token verify
        const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)

        // setp 3. userfinde in database
        const user = await User.findById(decode?._id).select("-password")
        if(!user){
            return res.status(401).json(
                {
                    success : false,
                    message : " Unauthroization User"
                }
            )
        }

        req.user = user
        next()
    } catch (error) {
        console.log("verify token errror : ", error.message);
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message
            }
        )
    }
}