
import User from "../models/user_model.js"

const getPremiumUser = async (req,res)=>{
    try {
        const user = await User.aggregate([
            // stage 1. user ka role user hona chaiye and verify bhi hona chaiye
            {
                $match : {
                    role : "user",
                    isVerified : true
                }
            },
            // stage 2. Unhe name ke hisaab se A to Z sort karo.
            {
                 $sort : {
                    name : 1
                 }
            },
            // stage 4. Sirf top 3 dikhao.
            {
                $limit : 3
            }
        ])

        return res.status(200).json(
            {
                success : true,
                message : "Successfully data find",
                data : user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server error",
                error : error.message
            }
        )
    }
}


const getUserDetials = async (req,res)=>{
    try {
        const user = await User.aggregate([
            // stage 1. filter 
            {
                $match : {
                    isActive : true
                }
            },

            // stage 2. new field add
            {
                $addFields : {
                    isAdult : {
                        $cond : {
                            if : {
                                $gte : ["$age",18]
                            },
                            then : true,
                            else : false
                        }
                    },
                    name : {
                        $toUpper : "$name"
                    }
                }
            },
            // stage 3. unwanted data hide using $ project
            {
                $project : {
                    password : 0,
                    __v : 0,
                    forgetPasswordToken : 0
                }
            }
        ])
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server error",
                error : error.message
            }
        )
    }
}


const userDetails = async ( req, res )=>{
    try {
        const user = await User.aggregate([
            // Stage 1. filter 
            {
                $match : {
                    role : "admin",
                    isVerified : true,
                    isActive : true,
                }
            },

            // Stage 2 . add new fileds and
            {
                $addFields : {
                    userNameLength : {
                        $strLenCP : "$username"
                    }
                },
            },

            // Stage 3. show filed as you want
            {
                $project : {
                    name : 1,
                    email : 1,
                    userNameLength : 1
                }
            }
        ])

        return res.status(200).json(
            {
                success : true,
                message : "Successfully get user detials",
                data : user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Internal Server error",
                error : error.message
            }
        )
    }
}