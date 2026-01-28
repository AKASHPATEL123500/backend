import express from 'express';
import { newRefreshToken, signin, signout, signup } from '../controllers/auth_controller.js';
import { verifyToken } from '../middlewares/is_Auth_middlewares.js';

const authRoute = express.Router();


authRoute.post( "/signup", signup )
authRoute.post( "/signin", signin )
authRoute.post( "/signout",verifyToken, signout )
authRoute.post( "/new-refresh-token", newRefreshToken )
export default authRoute