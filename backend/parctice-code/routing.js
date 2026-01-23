


// ✅ सभी users को store करने के लिए एक खाली array बनाया गया
// यह array database की तरह काम करेगा (रैम में)
const users = []

// ✅ express को JSON data को समझने के लिए बताया
// जब client JSON भेजे तो server समझ जाए
app.use(express.json())

// 📌 GET METHOD - सभी users की list निकालने के लिए
// URL: GET http://localhost:5000/users
// क्या करता है: array में सभी users को भेज देता है
app.get("/users",(req,res)=>{
   res.send(users)  // array को response में भेज दो
})

// 📌 POST METHOD - नया user बनाने के लिए (Register)
// URL: POST http://localhost:5000/login
// क्या करता है: नया user create करके array में add करता है
app.post("/login",(req,res)=>{

    // Step 1️⃣: Client से data निकालो
    // req.body में client जो data भेजे वह destructuring से निकाल लिया
    // {name, username, email, password} = req.body से तीनों field निकल गए
    const {name, username, email , password} = req.body

    // Step 2️⃣: Validation - सभी fields required हैं
    // अगर कोई field न हो तो error दो
    if(!name || !username || !email || !password){
        res.status(400).json({message:"all fileds are required"})
    }

    // Step 3️⃣: नया user object बनाओ
    // id = current time (हर user की unique ID)
    // name, username, email, password = client से आया
    const createUser = {
        id: Date.now(),           // unique ID = current timestamp
        name,                      // shorthand: name: name
        username,                  // shorthand: username: username
        email,                     // shorthand: email: email
        password                   // shorthand: password: password
    }

    // Step 4️⃣: नया user को array में add करो
    users.push(createUser)

    // Step 5️⃣: Created status (201) के साथ user भेज दो
    return res.status(201).json(createUser)
    
})

// 📌 PUT METHOD - पूरा user data update करने के लिए (सभी fields)
// URL: PUT http://localhost:5000/update-user/:id
// क्या करता है: user की सभी information को replace कर देता है
app.put("/update-user/:id",async (req,res)=>{
    // 📝 Logic समझिए:
    // 1. URL से user की ID निकालो
    // 2. नया data req.body से निकालो
    // 3. array में ID को ढूंढो
    // 4. अगर मिल गया तो सब कुछ replace करो
    // 5. अगर नहीं मिला तो 404 error दो
    
    try {
        // Step 1️⃣: URL से ID निकालो
        // /update-user/12345 में :id = 12345
        const userId = req.params.id
        
        // Step 2️⃣: Client के request से नई information निकालो
        // सभी fields लेंगे: name, username, email, password
        const {name, username , email, password} = req.body
     
        // Step 3️⃣: array में user को ढूंढो
        // findIndex() return करता है:
        //   - index number अगर user मिल गया
        //   - -1 अगर user नहीं मिला
        const userIndex =  await users.findIndex((u)=>u.id === Number(userId))

        // Step 4️⃣: अगर user मिल गया (userIndex !== -1)
        if(userIndex !== -1){
            // पूरा user object को नए data से replace करो
            // पुरानी सभी चीजें हट जाएंगी, नई चीजें आ जाएंगी
            users[userIndex]={
                id:Number(userId),           // ID वही रहेगी
                name:name,                   // नाम बदल जाएगा
                username:username,           // username बदल जाएगा
                email:email,                 // email बदल जाएगा
                password:password            // password बदल जाएगा
            };
            
            // 200 status = Success (ठीक है)
            return res.status(200).json({
                message:"user updated succefully",
                user:users[userIndex]
            });
        }
        // Step 5️⃣: अगर user नहीं मिला
        else{
            // 404 status = Not Found (नहीं मिला)
            return res.status(404).json({message:"user not found"})
        }
    } 
    catch (error) {
        // अगर कोई error आए तो 500 status भेजो
        return res.status(500).json({message:"internal server error"})
    };       
})


// 📌 DELETE METHOD - user को हटाने के लिए (पूरी तरह निकालना)
// URL: DELETE http://localhost:5000/delete-user/:id
// क्या करता है: user को array से पूरी तरह निकाल देता है
app.delete("/delete-user/:id",(req,res)=>{
    // 📝 Logic समझिए:
    // 1. URL से ID निकालो
    // 2. array में ID को ढूंढो
    // 3. अगर मिल गया तो splice() से हटा दो
    // 4. अगर नहीं मिला तो 404 error दो
    
    try {
        // Step 1️⃣: URL से user की ID निकालो
        // /delete-user/12345 में :id = 12345
        const userId = req.params.id
        
        // Step 2️⃣: array में user को ढूंढो
        // findIndex() return करता है सही index या -1
        const userIndex = users.findIndex((u)=>u.id === Number(userId))
        
        // Step 3️⃣: अगर user मिल गया
        if(userIndex !== -1){
            // splice(index, 1) = index पर से 1 element निकाल दो
            // splice(2, 1) = 2nd position से 1 element हटाओ
            // Array से permanently delete हो जाएगा
            users.splice(userIndex,1)
            
            // 200 status = Success
            return res.status(200).json({message:"user deleted successfully"})
        }
        // Step 4️⃣: अगर user नहीं मिला
        else{
            // 404 status = Not Found
            return res.status(404).json({message:"user not found"})
        }

    } catch (error) {
        // Error handling
        return res.status(500).json({message:"internal server error"})
    }
})



// 📌 PATCH METHOD - user के कुछ fields को update करने के लिए (आंशिक update)
// URL: PATCH http://localhost:5000/users/:id
// क्या करता है: सिर्फ जो fields भेजे गए हैं उन्हीं को update करता है
// बाकी fields जैसे हैं वैसे ही रहते हैं (PUT से अलग है)
app.patch("/users/:id", async (req, res) => {
    // 📝 Logic समझिए:
    // 1. URL से ID निकालो
    // 2. नया data निकालो (सिर्फ जो fields आए)
    // 3. array में ID को ढूंढो
    // 4. पुराने और नए data को merge करो (spread operator से)
    // 5. अगर ID नहीं मिला तो error दो
    
    try {
        // Step 1️⃣: URL से user की ID निकालो
        // /users/12345 में :id = 12345
        const userId = req.params.id
        
        // Step 2️⃣: Client के request से सिर्फ नया data निकालो
        // यहाँ सभी fields आ सकते हैं या कुछ ही
        // जो आए उन्हीं को update करेंगे
        const updateData = req.body
        
        // Step 3️⃣: array में user को ढूंढो
        // findIndex() = index return करता है या -1
        const userIndex = users.findIndex((u) => u.id === Number(userId))
        
        // Step 4️⃣: अगर user मिल गया
        if(userIndex !== -1) {
            // Spread operator (...) का उपयोग करके merge करो
            // {...users[userIndex]} = पुराने data की सभी values ले लो
            // {...updateData} = नई values जो आई हैं उन्हें top में रख दो
            // अगर कोई field दोनों में हो तो नई value आएगी
            
            // उदाहरण:
            // पुराना: {id: 123, name: "राज", email: "raj@email"}
            // नया: {name: "नया नाम"}
            // परिणाम: {id: 123, name: "नया नाम", email: "raj@email"}
            //                 ↑ बदल गया           ↑ जैसे था
            
            users[userIndex] = {
                ...users[userIndex],  // पुरानी सभी values लो
                ...updateData         // नई values से उन्हें override करो
            }
            
            // 200 status = Success
            return res.status(200).json({
                message: "User updated successfully",
                updatedUser: users[userIndex]
            })
        }
        
        // Step 5️⃣: अगर user नहीं मिला
        else {
            // 404 status = Not Found
            return res.status(404).json({
                message: "User not found"
            })
        }
        
    } catch (error) {
        // Error handling
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
})


// 📝 COMMENTED CODE - यह एक alternative PATCH implementation था
// अभी नहीं चल रहा है लेकिन समझने के लिए रखा गया है
// यह method individual field को manually update करता था

// app.get("/patch-method",async(req,res)=>{
//     try {
//         const userId = req.params.id
//         const {name} = req.body
//         const userIndex = users.findIndex((u)=>u.id === Number(userId))

//         if(userIndex !== -1){
//             const existingUser = users[userIndex]

//             // यहाँ सिर्फ name को update किया जाता था
//             // अगर name नहीं दिया गया तो पुरानी value रहती थी
//             const updatedUser = {...existingUser,name:name || existingUser.name}

//             users[userIndex] = updatedUser
//             return res.status(200).json({
//                 message:"user updated successfully",
//                 user:users[userIndex]
//             })

//         }else{
//             return res.status(404).json({message:"user not found"})
//         }
//     } catch (error) {
//         return res.status(500).json({message:"internal server error"})
//     }
// })