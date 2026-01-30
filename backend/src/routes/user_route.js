import express from "express"
import { getProfile, suggestedUsers, updateProfile, updateUserAvatar } from "../controllers/user_controller.js"
import { verifyToken } from "../middlewares/is_Auth_middlewares.js"
import { upload } from "../middlewares/multer.js"
const userRouter = express.Router()


userRouter.get("/get-profile",verifyToken,getProfile)
userRouter.get("/suggested-user",verifyToken,suggestedUsers)
userRouter.patch("/update-profile",verifyToken,updateProfile)
userRouter.patch("/update-profile-avatar",verifyToken,upload.single("avatar"),updateUserAvatar)

export default userRouter