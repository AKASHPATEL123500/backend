import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import crypto from "crypto"

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


    gender : {
        type : String,
        required : true,
        enum : ["male","female","other"]
    },


    age : {
        type : Number,
        required : true
    },


    avatar:{
        type : String, // cloudinary url ek string hota hai
        required : true
    },


    coverImage:{
        type: String,
    },


    refreshToken:{
        type : String,
    },


    isActive: {
        type: Boolean,
        default: true
    },


    isVerified : {
        type : Boolean,
        default : true // sikhen ke pashe me true hai
    },



    isBlocked: {
        type: Boolean,
        default: false
    },


    isSuspended: {
        type: Boolean,
        default: false
    },

    suspendUntil: {
        type: Date,
        default: null
    },

    role: {
       type: String,
       enum: ["user", "admin"],
       default: "user"
    },


    forgotPasswordToken :{
        type : String
    },


    forgotPasswordExpiry : {
        type : Date
    },


    reels: [{
    type: Schema.Types.ObjectId,
    ref: "Reel"
    }],

  likedReels: [{
    type: Schema.Types.ObjectId,
    ref: "Reel"
  }],

  savedReels: [{
    type: Schema.Types.ObjectId,
    ref: "Reel"
  }],
    
},{timestamps : true})


// Password hashed using pre hooks of mongoose
userSchema.pre("save",async function(){
    if(!this.isModified("password"))
        return 

    // Genrate salt kar rahe hai 
    const genSalt = await bcrypt.genSalt(12)

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






// forget password token genrate karana hai using crypto
userSchema.methods.generateForgotPasswordToken = async function (){
    // 1. Ek random string generate karo
    const resetToken = crypto.randomBytes(20).toString("hex")

    // 2. Token ko hash karke DB mein save karo (Security ke liye)
    this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    // 3. Expiry set karo (15 minutes)
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    // 4. Bina hash wala token wapas bhejo (Jo user ko email mein jayega)
    return resetToken;
}








const User = mongoose.model("User",userSchema)
export default User

