import dotenv from "dotenv"
dotenv.config()

const password = process.env.SECRET_DATA_PASSWORD

const myGurd = (req,res,next)=>{
    const apiKey = req.query.apiKey
    if(apiKey === password){
        console.log("Next ne jane diya agee");
        next()
    }else{
        return res.status(401).json({message:"Ivaild Password"})
    } 
}
export default myGurd
