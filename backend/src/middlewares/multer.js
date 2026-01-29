
import multer from "multer"

const storage = multer.diskStorage(
    {
        destination : function (req , file , cb){
            cb(null, "./public/temp") // file kaha jayegi
        },
        filename : function(req,file,cb){
            cb(null, file.originalname) // file ka orginal name se hi save hoga
        }
    }
)

export const upload = multer({storage}) 