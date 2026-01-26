import express from 'express';
import { signin, signout, signup } from '../controllers/auth_controller.js';
import { verifyToekn } from '../middlewares/is_Auth_middlewares.js';

const authRoute = express.Router();


authRoute.post( "/signup", signup )
authRoute.post( "/signin", signin )
authRoute.post( "/signout",verifyToekn, signout )

export default authRoute