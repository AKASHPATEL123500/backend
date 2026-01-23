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

        const findByEmail = await User.findOne({username})
        if(findByEmail){
            return res.status(400).json({
                success :  false,
                message : "UserName Already exists"
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
            message : "Internal Server Error"
        })
    }
}