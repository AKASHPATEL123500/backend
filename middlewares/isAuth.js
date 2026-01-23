import jwt from "jsonwebtoken";


// Middleware to check if the user is authenticated
const isAuth = (req,res,next)=>{
    // setp 1: get the token from the header
    const tkone = req.headers.authorization;
    if(!tkone){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    
    try {
        // setp 2: verify the token
        const decoded = jwt.verify(tkone,process.env.JWT_SECRET);

        // user data ko request me chipka do
        req.user = decoded;

        // next middleware ya route handler ko call karo
        next();

    } catch (error) {
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}

export default isAuth;