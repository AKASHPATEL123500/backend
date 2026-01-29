import express from "express"
import { getProfile, suggestedUsers, updateProfile } from "../controllers/user_controller.js"
import { verifyToken } from "../middlewares/is_Auth_middlewares.js"
const userRouter = express.Router()


userRouter.get("/get-profile",verifyToken,getProfile)
userRouter.get("/suggested-user",verifyToken,suggestedUsers)
userRouter.patch("/update-profile",verifyToken,updateProfile)

export default userRouter