// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// const app = express()

// app.use(express.json())

// const data = [
//     {
//         name: "akash patel",
//         username: "akash_patel",
//         password: "123455",
//         email: "akash@email.com"
//     },
//     {
//         name: "john doe",
//         username: "john_doe",
//         password: "password123",
//         email: "john@gmail.com"
//     },
//     {
//         name: "jane smith",
//         username: "jane_smith",
//         password: "qwerty456",
//         email: "jane@hmail.com"
//     }
// ]




// app.get("/",(req,res)=>{
//     res.send("Welcome to Express server")
// })



// app.get("/secret-data",async(req,res)=>{
//     try {
//         const password = await process.env.SECRET_DATA_PASSWORD
//         const apikey = req.query.apikey     
//         if(apikey === password){
//             res.status(200).json(data)
//         }else{
//             return res.status(401).json({message:"madarchod kiti baar samjhau ki tujhe data nahi mileg."})
//         }
//     } catch (error) {
//         return res.status(500).json({message:"Server internal error",error})
//     }
// })


// export default app


// ============ NEW CODE - Headers se secret pass lena ============

import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(express.json())

const data = [
    {
        name: "akash patel",
        username: "akash_patel",
        password: "123455",
        email: "akash@email.com"
    },
    {
        name: "john doe",
        username: "john_doe",
        password: "password123",
        email: "john@gmail.com"
    },
    {
        name: "jane smith",
        username: "jane_smith",
        password: "qwerty456",
        email: "jane@hmail.com"
    }
]

app.get("/", (req, res) => {
    res.send("Welcome to Express server")
})

// Headers se secret password lena
app.get("/secret-data", async (req, res) => {
    try {
        const password = process.env.SECRET_DATA_PASSWORD
        const secretKey = req.headers['x-secret-key']  // Headers se secret key lena
        
        if (secretKey === password) {
            res.status(200).json({
                success: true,
                message: "Data successfully retrieved",
                data: data
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Invalid secret key"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server internal error",
            error: error.message
        })
    }
})

export default app