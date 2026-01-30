import express from 'express';
import {  
    changeCurrentPassword,
    forgotPassword, 
    newRefreshToken, 
    resetPassword, 
    signin, 
    signout, 
    signup 
} from '../controllers/auth_controller.js';
import { verifyToken } from '../middlewares/is_Auth_middlewares.js';
import { upload } from '../middlewares/multer.js';
import authLimiter from '../middlewares/rateLimter.js';
import { validate } from '../middlewares/validate_middleware.js';
import { signupSchema } from '../validators/user_validator.js';

const authRoute = express.Router();


authRoute.post( "/signup", upload.fields([
    {
        name : "avatar", // yahi frontend me bhi name rahega 
        maxCount : 1
    },
    {
        name : "coverImage", // opstional hai 
        maxCount : 1 // ek baar me only ek hi image uploade
    }
]) , validate(signupSchema) , signup )


authRoute.post( "/signin", authLimiter , signin )
authRoute.post( "/signout",verifyToken, signout )
authRoute.post( "/change-password",verifyToken, changeCurrentPassword )
authRoute.post( "/new-refresh-token", newRefreshToken )
authRoute.post( "/forgot-password", forgotPassword)
authRoute.post( "/password/reset/:token", resetPassword)

export default authRoute