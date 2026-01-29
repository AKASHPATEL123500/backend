import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true , "Name is required"],
        trim : true
    },
    username:{
        type : String,
        unique : true,
        required : [true, "Username is required"],
        trim : true
    },
    email:{
        type : String,
        required : [true, "Email is required"],
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        trim : true,
    },
    refreshToken:{
        type : String,
    }
},{timestamps : true})


// Password hashed using pre hooks of mongoose
userSchema.pre("save",async function(){
    if(!this.isModified("password"))
        return 

    // Genrate salt kar rahe hai 
    const genSalt = await bcrypt.genSalt(15)

    // password hash kar rahe hai
    this.password = await bcrypt.hash(this.password,genSalt)
})


// password ko compare karenge
userSchema.methods.isPasswordMatched = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
    
}



// Token genrate

// Access Token Genrate
userSchema.methods.genrateAccessToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            username : this.username,
            email : this.email
        },
            process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY_KEY
        }
    )
}



// Refresh token

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id : this._id
        },
            process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY_KEY
        }
    )
}



const User = mongoose.model("User",userSchema)
export default User

