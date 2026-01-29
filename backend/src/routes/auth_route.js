import express from 'express';
import {  changeCurrentPassword, newRefreshToken, signin, signout, signup } from '../controllers/auth_controller.js';
import { verifyToken } from '../middlewares/is_Auth_middlewares.js';
import authLimiter from '../middlewares/rateLimter.js';

const authRoute = express.Router();


authRoute.post( "/signup", authLimiter , signup )
authRoute.post( "/signin", authLimiter , signin )
authRoute.post( "/signout",verifyToken, signout )
authRoute.post( "/change-password",verifyToken, changeCurrentPassword )
authRoute.post( "/new-refresh-token", newRefreshToken )


export default authRoute