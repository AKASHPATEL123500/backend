import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    username:{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password:{
        type : String,
        required : true,
    }
},{timestamps:true})

// mongoose middleware
// explanation : jab bhi user create ya update hoga to ye middleware chalega
// steps :
// 1. check karega ki password modified hai ya nahi
// 2. agr modified hai to salt generate karega
// 3. fir password ko hash karega
// 4. aur next karega

// pre means before save
// save means save operation
// next means next operation
// function means function to be executed

userSchema.pre("save", async function(){
    if (!this.isModified("password"))
        return;

    const slat = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, slat)
})




// method to compare password
// entered password and hashed password
// explanation : jab bhi user login karega to ye method chalega
// steps : 
// 1. entered password ko hashed password se compare karega
// 2. agr match karega to true return karega
// 3. agr match nahi karega to false return karega
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}


// Access token hum uer ko power de rahe hau
userSchema.methods.genrateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            username : this.username,
            email : this.email
        }
        ,
        process.env.ACCESS_TOKEN_SECRET_KEY
        ,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY_KEY
        }
    )
}


// Refresh Token Gen
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id
        },
            process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY_KEY
        }
    )
}
const User = mongoose.model("User",userSchema)
export default User;