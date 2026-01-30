import multer from "multer";

const storage = multer.diskStorage(
    {
        // sabse pahle hum destination denge ki kaha file store karna hai 
       destination : function (req , file , cb){
        cb(null , "./public/temp")
       },

       // then hum file ka ek uique name de denge yaha per oringal name hi hai file ha
       filename : function ( req , file , cb){
        cb(null, file.originalname)
       }
    }
)

export const upload = multer({storage})