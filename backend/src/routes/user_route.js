import express from "express"
import { getProfile, suggestedUsers, updateProfile, updateUserAvatar } from "../controllers/user_controller.js"
import { verifyToken } from "../middlewares/is_Auth_middlewares.js"
import { upload } from "../middlewares/multer.js"
import { validate } from "../middlewares/validate_middleware.js"
import { updateAccountSchema } from "../validators/user_validator.js"


const userRouter = express.Router()


userRouter.get("/get-profile",verifyToken,getProfile)
userRouter.get("/suggested-user",verifyToken,suggestedUsers)
userRouter.patch("/update-profile",verifyToken,validate(updateAccountSchema),updateProfile)
userRouter.patch("/update-profile-avatar",verifyToken,upload.single("avatar"),updateUserAvatar)

export default userRouter