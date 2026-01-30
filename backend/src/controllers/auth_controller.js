import bcrypt from "bcryptjs"
import User from "../models/user_model.js"
import jwt from "jsonwebtoken"
import uploadOnCloudinary from "../utils/cloudinary.js"



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

        // cloudinary setup
        // req.file se file path nikalo
        const avatarLocalPath = req.files?.avatar?.[0]?.path
        console.log("req.file : ",req.files);
        
        if(!avatarLocalPath){
            return res.status(400).json(
                {
                    success : false,
                    message : "Avatar is Required "
                }
            )
        }

        // Ab us local path ko uploadOnCloudinary function mein bhejo.
        //  Ye function tumhe ek object wapas dega jisme photo ka URL hoga.
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        if(!avatar){
            return res.status(400).json(
                {
                    success : false,
                    message : " Upload On Cloudinary Error"
                }
            )
        }


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
                name : name,
                username : username,
                email : email,
                password : password,
                avatar : avatar.url
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

        const accessToken = await existingUser.genrateAccessToken()
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
        .cookie("accessToken",accessToken,opstions)
        .json(
            {
                success : true,
                message : "SignIn Successfully",
                accessToken : accessToken,
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





export const signout = async ( req , res)=>{
    try {
        // user ko finde karnge req.user me se jo middleware me banaya tha
        // ussi se req.user?._id se find karenge
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {
                    refreshToken : undefined
                }
            },
            {
                new : true
            }
        )

        // opstion create
        const options = {
            httpOnly : true,
            secure : true
        }

        // then successfuly response send and logout 
        // and refresh token and accesstoken ko clear kar denge browser cookie se
        // ja signin ke time per cookie me save kiya tha bass ussi ko clear karna hai
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            {
                success : true,
                message : " Sign Out Successfully "
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


export const newRefreshToken = async ( req, res) => {
    try {
        
        // refresh token ko cookies ya body se nikalo
        const inComingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

        if(!inComingRefreshToken){
            return res.status(401).json(
                {
                    success : false,
                    message : "Unauthenticated Request"
                }
            )
        }

        // then iss token ko verify karnege apne refresh token secret key se
        const decodeToken = await jwt.verify(inComingRefreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
        if(!decodeToken){
            return res.status(401).json(
                {
                    success : false ,
                    message : "Invaild Refresh token",
                }
            )
        }

        // user ko find karenge db me uski _id se jo decode token me hai
        const user = await User.findById(decodeToken?._id)
        if(!user){
            return res.status(401).json(
                {
                    success : false,
                    message : "Refresh token is expired"
                }
            )
        }

        // abb hum iss jo refresh token ki nikale hai isse compare karenge db wale refresh token se
        if(inComingRefreshToken !== user?.refreshToken){
            return res.status(401).json(
                {
                    success : false,
                    message : "Refresh Token is expired"
                }
            )
        }

        // then hum new refresh token bana kar denge
        const accessToken = await user.genrateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        // databse me iss new refresh token ko save kar lenge pahle ke ki jagaha per jo humne 
        // signin ke time refresh token banaya tha uske jagha per iss new refresh token ko save karenge
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false})

        // abb hum browser me cookie ko save karennge with browere
        //  secuirty ke sath taki aur koi na padh paye
        const options = {
            httpOnly : true,
            secure : false,
            sameSite : process.env.NODE_ENV === "production",
            maxAge : 7 * 24 * 60 * 60 * 1000
        }

        // success response send and access token and refreshtoken
        //  ko browser ki cookie me save kar lenge

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            {
                success : true,
                message : " Re new refresh token genrate successfully",
                accessToken : accessToken
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message || "Re new refresh token error "
            }
        )
    }
}




export const changeCurrentPassword = async ( req, res ) =>{
    try {

        // req.body se data niklana hai
        const { oldPassword , newPassword } = req.body
        
        // user ko find karo
        const user = await User.findById(req.user._id).select("+password")
        if(!user){
            return res.status(401).json(
                {
                    success : false ,
                    message : "Unauthtentice Request User Not found"
                }
            )
        }

        // password ko check up karenge 
        const isCorrectPassword = await user.isPasswordMatched(oldPassword)
        if(!isCorrectPassword){
            return res.status(400).json(
                {
                    success : false,
                    message : "Old Password Not match"
                }
            )
        }

        // database me save newPassword
        user.password = newPassword
        user.save({ validateBeforeSave : false})

        // sucess message retun
        return res.status(200).json(
            {
                success : true,
                message : "Password Changed Successfully"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server Error",
                error : error.message || " Password Chnage Error "
            }
        )
    }
}




