import bcrypt from "bcryptjs"
import User from "../models/user_model.js"
import jwt from "jsonwebtoken"

export const signup = async (req,res)=>{
    try {
        const { name , username , email , password } = req.body

        // check all fields are filed or not
        if( !name || !username || !email || !password){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fileds are required"
                }
            )
        }
        console.log("user password :", password);
        
        // find by username 
        const findByUserName = await User.findOne({ username })
        if(findByUserName){
            return res.status(400).json(
                {
                    success : false,
                    message : "Username Already Exists"
                }
            )
        }
        

        // find by email
        const findByEmail = await User.findOne({ email })
        if(findByEmail){
            return res.status(400).json(
                {
                    success : false,
                    message : "Email Already Exists"
                }
            )
        }

        // user cretae
        const createUser = await User.create(
            {
                name,
                username,
                email,
                password
            }
        )

        return res.status(201).json(
            {
                success : true,
                message : "User Signin Successfully",
                createUser
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



export const signin = async (req,res)=>{
    try {
        const { username , password } = req.body

        if (!username || !password){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are required"
                }
            )
        }

        const existingUser = await User.findOne({ username }).select("+password")
        if(!existingUser){
            return res.status(404).json(
                {
                    success : false ,
                    message : "User Not Found 404"
                }
            )
        }

        const comparedPassword = await existingUser.isPasswordMatched(password)
        if(!comparedPassword){
            return res.status(400).json(
                {
                    success : false ,
                    message : "Incorrect Password Please Provide Correct Password"
                }
            )
        }

        const token = await existingUser.genrateAccessToken()
        const refreshToken = await existingUser.generateRefreshToken()

        existingUser.refreshToken = refreshToken
        await existingUser.save({ validateBeforeSave : false })

        const opstions = {
            httpOnly : true,
            secure : false,
            sameSite : process.env.NODE_ENV === "production",
            maxAge : 7 * 24 * 60 * 60 * 1000
        }
        return res
        .status(200)
        .cookie("refreshToken",refreshToken,opstions)
        .cookie("accessToken",token,opstions)
        .json(
            {
                success : true,
                message : "SignIn Successfully",
                accessToken : token,
                user : {
                    _id : existingUser._id,
                    name : existingUser.name,
                    username : existingUser.username,
                    email : existingUser.email,
                    createdAt : existingUser.createdAt,
                    updatedAt : existingUser.updatedAt,
                    __v : existingUser.__v
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





export const signout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {refreshToken : undefined}
            },
            {
                new : true
            }
        )

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .clearCookie("refreshToken",options)
        .clearCookie("accessToken",options)
        .json(
            {
                sucess : true,
                message : "Log out sucessfully"
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



// refresh token life server
export const newRefreshToken = async (req,res)=>{
    try {

        // 1. Token Nikalo: User ki cookie se refreshToken uthao.
        // 2. Verification (Phase 1): jwt.verify se check karo ki kya ye asli hai? (Yahan REFRESH_TOKEN_SECRET use hoga).
        // 3. Database Se Match (Phase 2): Database mein us user ko dhoondo jiska _id token mein hai. Phir check karo: "Kya DB wala refreshToken aur jo user ne bheja hai, wo dono SAME hain?"
        // 4. Naya Maal Taiyar Karo: Agar sab sahi hai, toh naya AccessToken aur naya RefreshToken generate karo.
        // 5. Save aur Bhej Do: Naya Refresh Token DB mein update karo aur dono tokens cookies mein set kar do.

        // refresh token ko nikala cookie se ya body se
        const refreshToken = req.cookies?.refreshToken || req.body.refreshToken
        // isko check kiya ki refresh token mila hai ki nhai
        if(!refreshToken){
            return res.status(401).json(
                {
                    success : false,
                    mesage : "Unauthenticated request"
                }
            )
        }

        // refreshtoken ko verify kiya apne secret key se ki sahi hai ya nhai toekn
        const decodeToken = await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)

        //Database me se user ko find kiya uske id se aur uska id decodeToken me ahi issliye _id likha
        const user = await User.findById(decodeToken?._id)
        if(!user){
            return res.status(401).json(
                {
                    success : false,
                    message : "Invaild Refresh Token"
                }
            )
        }

        // 5. Naye tokens banao (Wahi functions jo tune model mein likhe the)
        const accessToken = await user.genrateAccessToken()
        const newRefreshToken = await user.generateRefreshToken()

        // 6. database me save new refresh token
        user.refreshToken = newRefreshToken
        await user.save({ validateBeforeSave : false })

        // custom opstion for secuirty
        const opstions = {
            httpOnly : true,
            secure : false,
            sameSite : process.env.NODE_ENV === "production",
            maxAge : 7 * 24 * 60 * 60 * 1000
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,opstions)
        .cookie("newRefreshToken",newRefreshToken,opstions)
        .json(
            {
                success : true,
                message : "New Refresh Token Genrate Successfully",
                token : accessToken
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message || "invaild refresh token"
            }
        )
    }
}