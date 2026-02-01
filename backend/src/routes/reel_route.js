import express from "express"
import { verifyToken } from "../middlewares/is_Auth_middlewares.js"
import { uploadReel } from "../controllers/reel_controller.js"
import { upload } from "../middlewares/multer.js"

const reelRouter = express.Router()

reelRouter.post("/upload-reel",verifyToken,upload.fields([
    {
        name : "reel",
        maxCount : 1
    }
]),uploadReel)

export default reelRouter