import express from 'express';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import authRoute from './routes/auth_route.js';
import userRouter from './routes/user_route.js';
import cookieParser from "cookie-parser"
dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth/",authRoute)
app.use("/api/v1/user/",userRouter)











// local database ke liye array banaya
const data = []


// Get- method define kar rahe hai data manage karna ke liye 
app.get("/", (req, res) => {
    // sirf specific fields send kar rahe hai, password nahi
    const specificUsersDetails = data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
    }))
    res.json(specificUsersDetails);
})


// Post method deifine kar rahe hai naya data add karne ke liye
app.post("/signup", (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = data.find((user) => user.username === username || user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this username or email already exists" });
        }

        const createUser = {
            id: Date.now(),
            name: name,
            username: username,
            email: email,
            password: password
        }
        data.push(createUser);
        return res.status(201).json({
            success: true,
            message: " User Created Successfully ",
            createUser: createUser
        });


    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }

})


app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Pehle user dhoondo username se
        const existingUser = data.find((u) => u.username === username);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User Not found"
            });
        }

        // 2. Ab check karo: Kya milay huye user ka password match kar raha hai?
        // Hum pure array (data.find) mein nahi, sirf 'existingUser' par check karenge
        if (existingUser.password !== password) {
            return res.status(401).json({ // 401 Unauthorized zyada sahi hai
                success: false,
                message: "Incorrect Password"
            });
        }

        // 3. Login Success (Yahan hum response bhejenge)
        // Password ko response se hata dena achi baat hai
        const { password: userPass, ...userData } = existingUser;

        return res.status(200).json({
            success: true,
            message: "Login successful! Welcome back",
            user: userData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Put method define kar rahe hai data update karne ke liye
app.put("/update/:id", (req, res) => {
    // Sabse pahle id nikalenge url se
    // fir naya data lenege body se
    // fir check karegneg ki id exist karti hai ki nahi
    // agar exist karti hai to update kar denge
    // agar nahi karti to error message denge
    try {
        const userId = Number(req.params.id);

        const { name, username, email, password } = req.body;

        const userIndex = data.findIndex((user) => user.id === userId);

        if (userIndex !== -1) {
            data[userIndex] = {
                id: Number(userId),
                name: name,
                username: username,
                email: email,
                password: password
            }
            return res.status(200).json({
                success: true,
                message: "User Data Updated Successfully",
                updatedData: data[userIndex]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
})



app.delete("/delete/:id", (req, res) => {
    try {
        // const userId = Number(req.params.id);
        const { id } = req.params;
        const userId = Number(id);

        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id"
            })
        }


        console.log("Ye hai userId jo user ne browere se diya hai = ", userId);

        const userIndex = data.findIndex((user) => user.id === userId)

        if (userIndex !== -1) {
            const deleteData = data.splice(userIndex, 1)

            return res.status(200).json({
                success: true,
                message: "Delete Succssfully From Database",
                deleteData
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: " Internal Server Error ",
            error: error
        })
    }
})



app.get("/api/v1/find/user/:username", (req, res) => {
    const { username } = req.params;

    const user = data.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (user) {
        return res.status(200).json({
            success: true,
            message: "User Find successfully",
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
            }
        })
    } else {
        return res.status(404).json({
            success: false,
            message: " User Not Found "
        })
    }
})


// find by username using query params
app.get("/api/v1/search/user", (req, res) => {

    // query params se username nikal rahe hai

    // example : /api/v1/search/user?username=exampleUser

    // query params jo j user aya hai usko chack kar rahe hai ki sahi hai ki nhai

    // fir database me se search karenge username ke basis pe

    // agar mil jata hai to user details send kar denge

    // agar nahi milta to user not found message denge

    const { username } = req.query;
    if (!username) {
        return res.status(400).json({
            success: false,
            message: "Please provide username in query params"
        })
    }

    const databaseUser = data.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (databaseUser) {
        return res.status(200).json({
            success: true,
            message: "User found successfully",
            user: databaseUser
        })
    } else {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
})




app.get("/api/v1/search/name", (req, res) => {
    try {
        const { name } = req.query
        console.log("ye hai query se jo user ne name enter kiya hai = ", name);

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide a correct name"
            })
        }

        const dataName = data.find(u => u.name.toLowerCase() === name.toLowerCase())
        if (dataName) {
            return res.status(200).json({
                success: true,
                message: "User found Successfully by Name",
                user: dataName
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


app.post("/api/v1/login", (req, res) => {
    console.log("ye hai noraml check karne ka ki req.body me kya taa hai = ",req.body);
    return res.status(200).json({
        success: true,
        message: "Login API working fine"
    })
})











// Middleware
// phase 1


// const notFoundHandler = (req, res, next) => {
//     res.status(404).json({ message: "Route not found" });
//     next();
// }

// const Logger = (req, res, next) => {
//     console.log("Request URL:", req.url);
//     next();
// };

// app.use(Logger)

// check login using middleware
const checkLogin = (req, res, next) => {
    try {
        const token = req.get('token'); // 'req.headers.token' se thoda better hai (case-insensitive)

        if (!token || token !== "securetoken123") {
            // Failure Case: Yahi se bhaga do
            return res.status(401).json({
                success: false,
                message: "Unauthorized User, Please Login First"
            });
        }

        // Success Case: Aage jane do
        next();

    } catch (error) {
        // Unexpected Failure: Agar code mein koi aur galti ho gayi
        res.status(500).json({ success: false, message: "Internal Middleware Error" });
    }
}



app.get("/profile", checkLogin, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to your profile"
    })
})




// phase 2 type of middleware 

// 2.1 Application-level Middleware

app.use((req, res, next) => {
    // ye basic tha ye to clear hai

    // console.log("Ye hai req.url = ", req.url);
    // console.log("Ye hai req.baseurl = ", req.baseUrl);
    // console.log("Ye hai req.orignalurl = ", req.originalUrl);
    // console.log("Ye hai req.method = ", req.method);
    // console.log("Ye hai req.headers = ", req.headers);

    // ye khuch modify kiya hu jise ki jab bhi requsest aye uska time nikalna
    // ki kitini time per request iya hai user ne

    req.requestTime = new Date().toDateString()
    next();
})


app.get("/test", (req, res) => {
    res.send("Middleware Test Successful" + req.requestTime);
})

app.get("/about", (req, res) => {
    res.send("<h1>Hello this is about page</h1>" + req.requestTime)
})


app.use((req, res, next) => {
    console.log("Middleware chala");
    next() 
});

app.get("/akash", (req, res) => {
    res.send("Hello");
});



app.use((req, res, next) => {
   const isMaintenanceMode = false; // isko true kar do agar maintenance mode chahiye
   if(isMaintenanceMode){
    return res.status(503).send("<h1>Site is under maintenance, please try again later.</h1>");
   }
   next();
})

app.get("/maintenance", (req, res) => {
    res.send("<h1>Site is under maintenance, please try again later.</h1>");
});



app.use(express.urlencoded({extended:true}))

// 2.2 build-in-middleware
app.post("/register",(req,res)=>{

    console.log("ye hai jo index.html se data aya hai = ",req.body);

    return res.status(200).send("<h1>Data recive successfully</h1>")
})




// custrome middleware
// example 1:
const myMiddleware = (req,res,next)=>{
    console.log("middleware is run first");
    next()
}

app.use(myMiddleware)

app.get("/post",(req,res)=>{
    res.send("Hello this is post , it run after middleware ok")
})


// ex2;
const addUser = (req,res,next)=>{
    req.user = "Akash Patel";
    next();
}

app.use(addUser)

app.get("/home2",(req,res)=>{
    res.send("hello " + req.user)
})



// ex3
const checkLogins = (req,res,next)=>{
    const isLogin = false
    if(!isLogin){
        return res.send("<h1>Login is required</h1>")
    }
    next()
}

app.get("/home3",checkLogins,(req,res)=>{
    res.send("wellcome to dash bpoard")
})






const userdata =[
    {
        id:1,
        name:"Akash Patel",
        email:"akash@gmail.com",
        password:"akash123"
    },
    {
        id:2,
        name:"John Doe",
        email:"john@gmail.com",
        password:"john123"
    }
]

const isAuth = (req,res,next)=>{
    // setp 1: get the token from the header
    const tkone = req.headers.authorization;
    if(!tkone){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    
    try {
        // setp 2: verify the token
        const decoded = jwt.verify(tkone,process.env.JWT_SECRET);

        // user data ko request me chipka do
        req.user = decoded;

        // next middleware ya route handler ko call karo
        next();

    } catch (error) {
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}

app.post("/api/v1/auth/login",(req,res)=>{
    const {email,password} = req.body;
    const user = userdata.find((u) => u.email === email && u.password === password);
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password"
        })
    }
    // playlod decide karo
    const payload = {
        id:user.id,
        name:user.name,
        email:user.email,
        password:user.password
    }
    // token generate karo
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});

    return res.status(200).json({
        success:true,
        message:"Login successful",
        token:token
    })
})


app.get("/profiles",isAuth,(req,res)=>{
    return res.json({
        success : true,
        message : "Welcome to profile",
        user : req.user
    })
})





// custome middleware


const newData = [
    {
        id: 1,
        name: "Akash Patel",
        username: "akash123",
        email: "akash@gmail.com",
        password: "akash123"
    },
    {
        id: 2,
        name: "John Doe",
        username: "johnDoe",
        email: "johnDoe@gmail.com",
        password: "john123"
    },
    {
        id: 3,
        name: "Jane Smith",
        username: "janeS",
        email: "janeS@gmail.com",
        password: "jane123"
    }
]


const basicData = []

// this middleware check a condition leghth of password 
const vailditonCheck = (req, res, next) => {
    const { password, email , age } = req.body;

    // 1. Check Password
    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: "Password chota hai bhai!" });
    }

    // 2. Check Email
    if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "Email galat hai bhai!" });
    }

    // 3. bannded list email match karna
    const bannedEmails = ["abc@gmail.com", "xyz@gmail.com"]
    if (bannedEmails.includes(email)) {
        return res.status(403).json({ success: false, message: "Yeh email banned hai!" });
    }

    // 4. Age check karna
    if (age < 18){
       const myError = new Error ("Age must be at least 18+")
       myError.statusCode = 400;
       throw myError;
    }

    // 3. Sab sahi hai? Tabhi next() bulao
    next();
};


app.post("/basic",vailditonCheck,(req,res)=>{
    try {
        const { role , name , username , age , email, password }= req.body
        if( !role || !name || !username || !email || !password){
            return res.status(400).json({
                success : false,
                message : " All filds are required "
            })
        }

        const existingUser = basicData.find((user)=>user.username === username || user.password === password)
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "Username Already exist"
            })
        }
        const createUser = {
            id: Date.now(),
            role: role,
            name : name,
            username : username,
            age : age,
            email : email,
            password : password,
            createAtDate : new Date().toDateString(),
            createAtTime : new Date().toTimeString(),

        }
        basicData.push(createUser)
        return res.status(201).json({
            success : true,
            message : "User cretaed succssfuly",
            user: createUser
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal servre error"
        })
    }
})

const roleCheck = (req, res, next) => {
    const userRole = req.headers["role"] || req.query.role;
    
    if (userRole === "admin" || userRole === "user") {
        // Sirf extra info add karo aur aage bhejo
        req.userRole = userRole; 
        next(); 
    } else {
        return res.status(403).json({ success: false, message: "Role not found" });
    }
};

// Route Handler
app.get("/api/basic", roleCheck, (req, res) => {
    // Ab yahan decide karo kya dikhana hai
    if (req.userRole === "admin") {
        res.send("<h1>Welcome Admin</h1>");
    } else {
        res.send("Welcome User");
    }
});




// error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.stack);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success : false,
        message : err.message || "Internal Server Error",
        stack : process.env.NODE_ENV === "production" ? null : err.stack
    })
    
})



// Example: Ek user dhoondne ka logic
app.get("/api/data/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);
        
        // 1. Manually error throw karna (Logic)
        if (id > 100) {
            const error = new Error("ID 100 se badi nahi ho sakti!");
            error.statusCode = 400;
            throw error; // Step 1: Throw kiya
        }

        // 2. Automatic error (System error)
        // Maan lo 'database' variable define nahi hai, toh JS khud 'throw' karega
        // res.json(database.users); 

        res.send("Data mil gaya!");
    } catch (err) {
        next(err); // Step 2: Error ko global handler ko bhej diya
    }
});

// Step 3: Global Error Handler (Hamesha niche rahega)
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
});

export default app;