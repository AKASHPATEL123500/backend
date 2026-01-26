import express from "express"
import { verifyToekn } from "../middlewares/is_Auth_middlewares.js"
import { getProfile, suggestedUsers } from "../controllers/user_controller.js"

const userRouter = express.Router()


userRouter.get("/get-profile",verifyToekn,getProfile)
userRouter.get("/suggested-user",verifyToekn,suggestedUsers)

export default userRouter