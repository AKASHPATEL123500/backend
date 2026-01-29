import express from 'express';
import {  changeCurrentPassword, newRefreshToken, signin, signout, signup } from '../controllers/auth_controller.js';
import { verifyToken } from '../middlewares/is_Auth_middlewares.js';
import { upload } from '../middlewares/multer.js';

const authRoute = express.Router();


authRoute.post( "/signup" , upload.fields([
    {
        name : "avatar", // yahi frontend me bhi name rahega 
        maxCount : 1
    },
    {
        name : "coverImage", // opstional hai 
        maxCount : 1 // ek baar me only ek hi image uploade
    }
])  , signup )



authRoute.post( "/signin" , signin )
authRoute.post( "/signout",verifyToken, signout )
authRoute.post( "/change-password",verifyToken, changeCurrentPassword )
authRoute.post( "/new-refresh-token", newRefreshToken )


export default authRoute