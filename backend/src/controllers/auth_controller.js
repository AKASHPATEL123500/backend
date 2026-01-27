import User from "../models/user_model.js"
import bcrypt from "bcryptjs"


export const signup = async (req , res)=>{
    // req.body se data nikalnge
    // all fields ko check karenge ki empty to nahi  hai
    // agr empty hai to eeror show
    // check that username and email alredy exist or not
    // if yess throw error
    // find by username kya yah user database me already hai to nhai
    // find by email kya yah email already database me hai to nhai 
    // agr sab khuch sahi hai to user ko create karadenge 
    // and retunr kar denge
    try {
        const { name , username , email , password } = req.body

        if( !name || !username || !email || !password ){
            return res.status(400).json({
                success : false,
                message : " All filds are required "
            })
        }

        const findByUsername = await User.findOne({username})
        if(findByUsername){
            return res.status(400).json({
                success :  false,
                message : "UserName Already exists"
            })
        }

        const findByEmail = await User.findOne({email})
        if(findByEmail){
            return res.status(400).json({
                success :  false,
                message : "Email Already exists"
            })
        }


        const createUser = await User.create({
            name,
            username,
            email,
            password
        })
        return res.status(201).json({
            success : true,
            message : "User Created Successfully",
            createUser
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
            erroe : error.message
        })
    }
}





export const signin = async (req, res) =>{
    // req.body se data nikalna 
    // finde karneg ki username mila ki nhai 
    // password ko compare karn ahia 

    try {

        // req.body se data nikalna
        const { username, password } = req.body

        // finde karneg ki username mila ki nhai
        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // password ko compare karn ahia
        // model me method banaya hai isPasswordMatched
        // jo ki password compare karega
        const isCorrectPassword = await existingUser.isPasswordMatched(password)
        if (!isCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        

        // Acess toekn 
        // Refresh token generate karna hai
        const token = await existingUser.genrateAccessToken()
        const refreshToken = await existingUser.generateRefreshToken()

        // refresh token ko database me save karna hai
        existingUser.refreshToken = refreshToken
        await existingUser.save({validateBeforeSave : false})

        // // Send user without password 
        // const userWithoutPassword = existingUser.toObject()
        // delete userWithoutPassword.password


        // send token in http only cookie
        const opstions = {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        }
        // cookie set 
        return res
            .status(200)
            .cookie("refreshToken", refreshToken , opstions)
            .json({
                success : true,
                message : "User Signed in Successfully",
                accessToekn : token,
                user : userWithoutPassword
            })
    } catch (error) {
        console.log("Your Error is : ", error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}






export const signout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: { refreshToken: 1 }
            }
        )

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                success: true,
                message: "User Logged Out Successfully"
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout Failed",
            error: error.message
        })
    }
}

