# 📚 EXPRESS.JS - WEEK 1 COMPLETE NOTES (हिंदी में)

---

## **🎯 WEEK 1 का लक्ष्य:**
```
✅ Node.js को समझो
✅ npm को समझो
✅ Express.js setup करो
✅ HTTP Methods को समझो
✅ अपना पहला server बनाओ
✅ Request-Response cycle को समझो
```

---

---

# **PART 1: NODE.JS BASICS**

---

## **1.1 Node.js क्या है?**

### **Simple Definition:**
```
Node.js = JavaScript को Server पर चलाने का platform
```

### **पहले:**
```
JavaScript = Browser में ही चलता था (Frontend)
```

### **अब (Node.js के साथ):**
```
JavaScript = Server पर भी चल सकता है (Backend)
```

### **Example:**
```
Browser में:
  document.getElementById() ✅ काम करता है

Server पर (Node.js):
  document.getElementById() ❌ काम नहीं करता
  (क्योंकि HTML नहीं होता server पर)

Server पर Node.js:
  File system ✅ (फ़ाइलें पढ़ो-लिखो)
  Database ✅ (data store करो)
  API बनाओ ✅ (request-response)
```

---

## **1.2 Node.js को Install करना**

### **Step 1: Download करो**
```bash
https://nodejs.org/en/download/
```

### **Step 2: Install करो**
```bash
# Windows: डाउनलोड की गई फ़ाइल को चलाओ और install करो
# Mac/Linux: Terminal में निर्देशों का पालन करो
```

### **Step 3: Verify करो**
```bash
node --version    # Node.js का version देखो
npm --version     # npm का version देखो
```

### **Output:**
```bash
v18.17.0          # Node.js version
9.6.7             # npm version
```

---

## **1.3 आपका पहला Node.js Program**

### **Step 1: फ़ाइल बनाओ**
```bash
# hello.js नामक फ़ाइल बनाओ
```

### **Step 2: Code लिखो**
```javascript
// hello.js
console.log("नमस्ते! यह Node.js है!")
console.log("मैं server पर चल रहा हूँ 🚀")

const name = "राज"
console.log(`नाम: ${name}`)
```

### **Step 3: चलाओ**
```bash
node hello.js
```

### **Output:**
```
नमस्ते! यह Node.js है!
मैं server पर चल रहा हूँ 🚀
नाम: राज
```

---

---

# **PART 2: NPM (NODE PACKAGE MANAGER)**

---

## **2.1 npm क्या है?**

### **Definition:**
```
npm = Node Package Manager
    = JavaScript के packages/libraries का store
    = जहाँ से code के टुकड़े download करते हो
```

### **Analogy (सादृश्य):**
```
npm = Google Play Store या App Store की तरह
    = जहाँ apps download करते हो, वहाँ code packages download करते हो
```

### **कुछ Popular Packages:**
```
express    = Web framework
mongoose   = Database library
axios      = HTTP requests
dotenv     = Environment variables
jwt        = Authentication
cors       = Cross-origin requests
```

---

## **2.2 npm Commands - सबसे महत्वपूर्ण**

### **Command 1: npm init**
```bash
npm init
```

**क्या करता है:**
```
✅ एक नई project शुरू करता है
✅ package.json फ़ाइल बनाता है
✅ Project की जानकारी माँगता है
```

**Process:**
```bash
npm init

# Terminal में प्रश्न आते हैं:
package name: (my-project) myapp
version: (1.0.0) 1.0.0
description: My first Express app
entry point: (index.js) index.js
test command: 
keywords: 
author: Your Name
license: (ISC) ISC

# फिर package.json create हो जाता है
```

**package.json क्या होता है:**
```javascript
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "My first Express app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name",
  "license": "ISC"
}
```

---

### **Command 2: npm install**
```bash
npm install express
```

**क्या करता है:**
```
✅ npm registry से package download करता है
✅ node_modules folder में रखता है
✅ package.json में entry add करता है
```

**Before:**
```json
{
  "name": "myapp",
  "dependencies": {}
}
```

**After npm install express:**
```json
{
  "name": "myapp",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

### **Command 3: npm install (npm i)**
```bash
# दोनों same हैं
npm install
npm i
```

**क्या करता है:**
```
✅ package.json में दिए सभी packages install करता है
✅ पहली बार project setup करते वक़्त use करते हो
```

---

### **Command 4: npm install --save-dev (npm i -D)**
```bash
npm install --save-dev nodemon
npm i -D nodemon
```

**क्या होता है:**
```javascript
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**Difference:**
```
dependencies:    Production में भी चाहिए (express)
devDependencies: सिर्फ development में चाहिए (nodemon)
```

---

### **Command 5: npm run**
```bash
npm run start
npm run dev
npm run test
```

**क्या होता है:**
```javascript
// package.json में
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  }
}

// Terminal में
npm run start   → node app.js चलाता है
npm run dev     → nodemon app.js चलाता है
npm run test    → jest चलाता है
```

---

## **2.3 node_modules क्या होता है?**

### **Definition:**
```
node_modules = वह folder जहाँ सभी installed packages रहते हैं
```

### **Size:**
```
बहुत बड़ा! 🐘 (कई MB से GB तक)
```

### **Why बड़ा?**
```
express के अंदर भी कई dependencies होती हैं
उन dependencies के भी dependencies होती हैं
यह chain बहुत लंबी होती है
```

### **Structure:**
```
node_modules/
├── express/
│   ├── index.js
│   ├── package.json
│   └── ... (1000+ files)
├── body-parser/
├── cors/
├── dotenv/
└── ... (300+ packages)
```

---

## **2.4 .gitignore - बहुत महत्वपूर्ण**

### **क्यों .gitignore?**
```
node_modules को GitHub पर नहीं push करना चाहिए
क्योंकि:
✅ Size बहुत बड़ा है
✅ कोई भी कर सकता है npm install करके download करना
```

### **कैसे बनाएँ?**
```bash
# .gitignore फ़ाइल बनाओ
echo "node_modules/" > .gitignore
```

### **.gitignore में क्या लिखें:**
```
node_modules/
.env
.DS_Store
dist/
build/
```

---

---

# **PART 3: EXPRESS.JS SETUP**

---

## **3.1 Express.js क्या है?**

### **Definition:**
```
Express.js = Node.js के लिए Web Framework
          = Server बनाना आसान बनाता है
          = Routing, Middleware, आदि provide करता है
```

### **बिना Express के:**
```javascript
// Node.js के साथ HTTP server बनाना बहुत मुश्किल है
const http = require('http')
const server = http.createServer((req, res) => {
    if(req.url === '/users') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({users: []}))
    }
})
server.listen(5000)
```

### **Express के साथ:**
```javascript
// Express के साथ बहुत आसान है
import express from 'express'
const app = express()

app.get('/users', (req, res) => {
    res.json({users: []})
})

app.listen(5000)
```

---

## **3.2 Express Install करना**

### **Step 1: npm init करो**
```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

**-y flag क्या करता है:**
```
सभी default options को automatically select कर देता है
(प्रश्न नहीं पूछता)
```

### **Step 2: Express install करो**
```bash
npm install express
```

### **Step 3: Verify करो**
```bash
# package.json को खोलो
# देखो कि express वहाँ है
```

**package.json:**
```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## **3.3 nodemon Install करना (Optional लेकिन जरूरी)**

### **क्या है nodemon?**
```
nodemon = जब आप code save करते हो तो automatically restart करता है
```

### **बिना nodemon:**
```bash
node app.js
# Code में बदलाव करो
# Ctrl+C से बंद करो
# फिर node app.js चलाओ
# 😫 हर बार manually करना पड़ता है
```

### **nodemon के साथ:**
```bash
nodemon app.js
# Code में बदलाव करो
# Server automatically restart हो जाता है
# 😊 आसान है
```

### **Install करो:**
```bash
npm install --save-dev nodemon
```

### **package.json में script add करो:**
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

### **अब चलाओ:**
```bash
npm run dev
```

---

## **3.4 आपका पहला Express Server**

### **Step 1: app.js फ़ाइल बनाओ**

### **Step 2: Code लिखो**
```javascript
// app.js

// Step 1️⃣: Express import करो
import express from "express"

// Step 2️⃣: App instance बनाओ
const app = express()

// Step 3️⃣: Port define करो
const PORT = 5000

// Step 4️⃣: एक simple route बनाओ
app.get("/", (req, res) => {
    res.send("नमस्ते! मेरा Express server चल रहा है 🚀")
})

// Step 5️⃣: Server start करो
app.listen(PORT, () => {
    console.log(`✅ Server चल रहा है: http://localhost:${PORT}`)
})
```

### **Step 3: Server चलाओ**
```bash
npm run dev

# या अगर script नहीं है तो:
node app.js
```

### **Output:**
```
✅ Server चल रहा है: http://localhost:5000
```

### **Step 4: Browser में देखो**
```
http://localhost:5000

Output: नमस्ते! मेरा Express server चल रहा है 🚀
```

### **🎉 Congratulations! आपका पहला Express server चल गया!**

---

---

# **PART 4: HTTP METHODS - विस्तार से**

---

## **4.1 HTTP क्या है?**

### **Definition:**
```
HTTP = HyperText Transfer Protocol
     = Browser और Server के बीच data भेजने का तरीका
```

### **Flow:**
```
Browser (Client)
    ↓ (HTTP Request)
Server
    ↓ (HTTP Response)
Browser (Client)
```

---

## **4.2 HTTP Methods - 5 मुख्य**

### **1️⃣ GET - डेटा लेना (Read)**

**क्या करता है:**
```
Server से data माँगना
Data modify नहीं करना
```

**Real-life Example:**
```
दुकान में जाकर कुछ देखना (बिना खरीदे)
```

**Code:**
```javascript
app.get("/users", (req, res) => {
    res.send("सभी users की list")
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    res.send(`User ID: ${id}`)
})
```

**Postman में:**
```
Method: GET
URL: http://localhost:5000/users
```

**Use Cases:**
```
✅ सभी users देखना
✅ एक specific user देखना
✅ Products की list देखना
✅ Blog posts देखना
```

---

### **2️⃣ POST - डेटा भेजना (Create)**

**क्या करता है:**
```
Server को नया data भेजना
Server में नई entry बनवाना
```

**Real-life Example:**
```
दुकान में जाकर सामान खरीदना (data create होता है)
```

**Code:**
```javascript
app.post("/users", (req, res) => {
    // req.body से data लो
    const {name, email} = req.body
    
    // Database में save करो
    // नया user बनाओ
    
    res.status(201).json({
        message: "User successfully created",
        user: {name, email}
    })
})
```

**Postman में:**
```
Method: POST
URL: http://localhost:5000/users
Body (JSON):
{
  "name": "राज",
  "email": "raj@email.com"
}
```

**Use Cases:**
```
✅ नया user register करना
✅ नई post बनाना
✅ Comment add करना
✅ नया order create करना
```

---

### **3️⃣ PUT - पूरा डेटा बदलना (Replace/Update)**

**क्या करता है:**
```
पूरे record को replace करना
सभी fields को update करना
```

**Real-life Example:**
```
अपनी सारी personal information फिर से भरना
```

**Code:**
```javascript
app.put("/users/:id", (req, res) => {
    const userId = req.params.id
    const {name, email, password} = req.body
    
    // पुराना data निकालो
    // नए data से replace करो
    // सब कुछ update करो (सभी fields)
    
    res.json({
        message: "User updated",
        user: {id: userId, name, email, password}
    })
})
```

**Postman में:**
```
Method: PUT
URL: http://localhost:5000/users/1
Body (JSON):
{
  "name": "राज कुमार",
  "email": "rajkumar@email.com",
  "password": "newpass123"
}
```

**Use Cases:**
```
✅ पूरी profile update करना
✅ सभी information change करना
✅ Complete record replacement
```

---

### **4️⃣ DELETE - डेटा हटाना (Remove)**

**क्या करता है:**
```
Database से record को delete करना
पूरी तरह निकालना
```

**Real-life Example:**
```
Account को permanently delete करना
```

**Code:**
```javascript
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id
    
    // Database से record निकालो
    // Permanently delete करो
    
    res.json({
        message: "User deleted successfully",
        deletedId: userId
    })
})
```

**Postman में:**
```
Method: DELETE
URL: http://localhost:5000/users/1
```

**Use Cases:**
```
✅ User को delete करना
✅ Post को remove करना
✅ Comment को delete करना
```

---

### **5️⃣ PATCH - आंशिक डेटा बदलना (Partial Update)**

**क्या करता है:**
```
सिर्फ कुछ fields को update करना
बाकी fields जैसे हैं वैसे रहते हैं
```

**Real-life Example:**
```
अपना सिर्फ नाम बदलना (बाकी सब जैसे हैं)
```

**Code:**
```javascript
app.patch("/users/:id", (req, res) => {
    const userId = req.params.id
    const updateData = req.body
    
    // पुरानी जानकारी लो
    // सिर्फ दिए गए fields update करो
    // बाकी जैसे हैं वैसे रखो
    
    res.json({
        message: "User partially updated",
        updatedFields: updateData
    })
})
```

**Postman में:**
```
Method: PATCH
URL: http://localhost:5000/users/1
Body (JSON):
{
  "name": "नया नाम"
}
```

**Use Cases:**
```
✅ सिर्फ नाम बदलना
✅ सिर्फ email update करना
✅ Status change करना
```

---

## **4.3 Methods की तुलना**

| Method | Purpose | Data | Safe | Idempotent |
|--------|---------|------|------|-----------|
| GET | Read करना | नहीं | ✅ | ✅ |
| POST | Create करना | हाँ | ❌ | ❌ |
| PUT | पूरा Replace | हाँ | ❌ | ✅ |
| DELETE | Delete करना | नहीं | ❌ | ✅ |
| PATCH | आंशिक Update | हाँ | ❌ | ❌ |

**Safe:** Server data change नहीं होता
**Idempotent:** एक जैसा result जब भी करो

---

---

# **PART 5: REQUEST & RESPONSE - गहराई से**

---

## **5.1 Request Object (req) क्या है?**

**Definition:**
```
req = Client (Browser/App) की जानकारी
    = क्या माँग रहा है
    = कौन सी जानकारी भेज रहा है
```

### **req के मुख्य Properties:**

#### **req.method**
```javascript
console.log(req.method)  // "GET", "POST", "PUT", आदि
```

#### **req.url**
```javascript
console.log(req.url)  // "/users", "/about", आदि
```

#### **req.params** - URL में dynamic parameters
```javascript
// Route: /users/:id
app.get("/users/:id", (req, res) => {
    console.log(req.params)      // {id: "123"}
    console.log(req.params.id)   // "123"
})

// URL: /users/123
```

#### **req.query** - URL में ? के बाद वाले parameters
```javascript
// Route: /search
app.get("/search", (req, res) => {
    console.log(req.query)    // {q: "javascript", limit: "10"}
    console.log(req.query.q)  // "javascript"
})

// URL: /search?q=javascript&limit=10
```

#### **req.body** - POST/PUT/PATCH में भेजा गया data
```javascript
app.post("/users", (req, res) => {
    console.log(req.body)  // {name: "राज", email: "raj@email.com"}
})

// Note: middleware की जरूरत है - app.use(express.json())
```

#### **req.headers** - Request headers
```javascript
console.log(req.headers)
// Output:
// {
//   'content-type': 'application/json',
//   'user-agent': 'Mozilla/5.0...',
//   'authorization': 'Bearer token123'
// }
```

---

## **5.2 Response Object (res) क्या है?**

**Definition:**
```
res = Server क्या भेज रहा है
    = Client को क्या respond करता है
```

### **res के मुख्य Methods:**

#### **res.send() - Simple response**
```javascript
app.get("/", (req, res) => {
    res.send("नमस्ते!")
})
```

#### **res.json() - JSON response**
```javascript
app.get("/users", (req, res) => {
    res.json({users: [{id: 1, name: "राज"}]})
})
```

#### **res.status() - Status code के साथ**
```javascript
app.post("/users", (req, res) => {
    res.status(201).json({message: "User created"})
})
```

#### **res.redirect() - किसी दूसरे URL को redirect करना**
```javascript
app.get("/old", (req, res) => {
    res.redirect("/new")
})
```

#### **res.render() - HTML template render करना**
```javascript
app.get("/", (req, res) => {
    res.render("index.ejs", {name: "राज"})
})
```

---

## **5.3 Complete Request-Response Example**

### **Full Example:**
```javascript
import express from "express"
const app = express()

// ✅ Middleware (महत्वपूर्ण)
app.use(express.json())

// ✅ Routes
app.get("/", (req, res) => {
    console.log("GET request आया")
    res.send("Home page")
})

app.post("/users", (req, res) => {
    console.log("POST request आया")
    console.log("Data:", req.body)
    
    const {name, email} = req.body
    
    if(!name || !email) {
        return res.status(400).json({
            error: "Name and email required"
        })
    }
    
    res.status(201).json({
        message: "User created",
        user: {name, email}
    })
})

app.get("/users/:id", (req, res) => {
    const userId = req.params.id
    res.json({userId, message: `User ${userId} की जानकारी`})
})

app.listen(5000, () => {
    console.log("Server चल रहा है")
})
```

### **Postman में Test करो:**

**Test 1: GET /**
```
GET http://localhost:5000/
Response: Home page
```

**Test 2: POST /users (सही data)**
```
POST http://localhost:5000/users
Body: {"name": "राज", "email": "raj@email.com"}
Response: {
  "message": "User created",
  "user": {"name": "राज", "email": "raj@email.com"}
}
```

**Test 3: POST /users (गलत data)**
```
POST http://localhost:5000/users
Body: {"name": "राज"}
Response: {
  "error": "Name and email required"
}
Status: 400
```

**Test 4: GET /users/:id**
```
GET http://localhost:5000/users/123
Response: {
  "userId": "123",
  "message": "User 123 की जानकारी"
}
```

---

---

# **PART 6: HTTP STATUS CODES - महत्वपूर्ण**

---

## **6.1 Status Codes क्या हैं?**

**Definition:**
```
3-digit numbers जो response की स्थिति बताते हैं
```

---

## **6.2 5 Categories of Status Codes**

### **1️⃣ 1xx - Information (सूचनात्मक)**
```
100 - Continue
101 - Switching Protocols
```

### **2️⃣ 2xx - Success (सफलता) ✅**

#### **200 - OK (सबकुछ ठीक है)**
```javascript
app.get("/users", (req, res) => {
    res.status(200).json({users: []})
})
```

#### **201 - Created (नई चीज बनी) 🆕**
```javascript
app.post("/users", (req, res) => {
    res.status(201).json({message: "User created"})
})
```

#### **204 - No Content (कुछ नहीं भेजा)**
```javascript
app.delete("/users/:id", (req, res) => {
    res.status(204).send()
})
```

---

### **3️⃣ 3xx - Redirection (रीडायरेक्ट)**

#### **301 - Moved Permanently (स्थायी रूप से बदल गया)**
```javascript
app.get("/old-page", (req, res) => {
    res.redirect(301, "/new-page")
})
```

#### **302 - Found (अस्थायी रूप से बदल गया)**
```javascript
app.get("/temp", (req, res) => {
    res.redirect(302, "/temp-location")
})
```

---

### **4️⃣ 4xx - Client Error (Client की गलती) ❌**

#### **400 - Bad Request (गलत request)**
```javascript
app.post("/users", (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({
            error: "Name required"
        })
    }
})
```

#### **401 - Unauthorized (अनुमति नहीं)**
```javascript
app.get("/admin", (req, res) => {
    if(!req.headers.authorization) {
        return res.status(401).json({
            error: "Token required"
        })
    }
})
```

#### **403 - Forbidden (forbidden है)**
```javascript
app.get("/admin", (req, res) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({
            error: "Admin access required"
        })
    }
})
```

#### **404 - Not Found (नहीं मिला) 🔍**
```javascript
app.get("/users/:id", (req, res) => {
    if(!userExists) {
        return res.status(404).json({
            error: "User not found"
        })
    }
})
```

#### **409 - Conflict (conflict है)**
```javascript
app.post("/users", (req, res) => {
    if(userAlreadyExists) {
        return res.status(409).json({
            error: "User already exists"
        })
    }
})
```

---

### **5️⃣ 5xx - Server Error (Server की गलती) 💥**

#### **500 - Internal Server Error (सामान्य server error)**
```javascript
app.get("/users", (req, res) => {
    try {
        // कुछ करो
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
})
```

#### **502 - Bad Gateway**
```javascript
// Server temporary down है
```

#### **503 - Service Unavailable**
```javascript
// Server maintenance में है
```

---

## **6.3 Common Status Codes Reference**

```javascript
// SUCCESS (2xx)
200  // OK - सबकुछ ठीक है
201  // Created - नई entry बनी
204  // No Content - कुछ नहीं भेजा

// CLIENT ERROR (4xx)
400  // Bad Request - गलत request
401  // Unauthorized - Authentication चाहिए
403  // Forbidden - Permission नहीं है
404  // Not Found - Resource नहीं मिला
409  // Conflict - Conflict है (जैसे duplicate)

// SERVER ERROR (5xx)
500  // Internal Server Error - Server error
503  // Service Unavailable - Server down
```

---

---

# **PART 7: MIDDLEWARE - अंतर्दृष्टि**

---

## **7.1 Middleware क्या है?**

**Definition:**
```
Middleware = Request और Response के बीच में होने वाली processing
```

**Visualization:**
```
Request
  ↓
Middleware 1 (करो कुछ काम, फिर next())
  ↓
Middleware 2 (करो कुछ काम, फिर next())
  ↓
Route Handler (असली काम करो)
  ↓
Response
```

---

## **7.2 Express के Built-in Middleware**

### **express.json()**
```javascript
import express from "express"
const app = express()

// यह middleware
app.use(express.json())

// क्या करता है:
// JSON data को parse करता है
// req.body में convert करता है

app.post("/users", (req, res) => {
    // यह काम करता है क्योंकि express.json() है
    const {name, email} = req.body
    res.json({name, email})
})
```

### **express.urlencoded()**
```javascript
app.use(express.urlencoded({extended: true}))

// Form data को parse करता है
// जब HTML forms से data आता है
```

### **express.static()**
```javascript
app.use(express.static("public"))

// public folder की files को serve करता है
// /public/style.css → /style.css से access हो जाता है
```

---

## **7.3 Custom Middleware बनाना**

### **Simple Custom Middleware:**
```javascript
// Middleware जो request को log करता है
const logMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()  // अगले handler को भेजो
}

app.use(logMiddleware)

app.get("/", (req, res) => {
    res.send("Home")
})

// जब GET / आए तो:
// Console में दिखेगा: GET /
// फिर response भेजेगा: Home
```

### **Middleware Function के Parts:**
```javascript
const myMiddleware = (req, res, next) => {
    // req = incoming request की info
    // res = response भेजने के लिए
    // next = अगले middleware/handler को भेजने के लिए
    
    console.log("कुछ काम")
    next()  // यह बहुत जरूरी है!
}
```

### **अगर next() नहीं दिया तो:**
```javascript
const badMiddleware = (req, res, next) => {
    console.log("काम कर रहे हैं")
    // next() नहीं दिया!
}

app.use(badMiddleware)

app.get("/", (req, res) => {
    res.send("यह कभी नहीं दिखेगा") // stuck रहेगा
})
```

---

## **7.4 Multiple Middleware**

```javascript
// Middleware 1
const middleware1 = (req, res, next) => {
    console.log("1️⃣ Middleware 1 चल रहा है")
    next()
}

// Middleware 2
const middleware2 = (req, res, next) => {
    console.log("2️⃣ Middleware 2 चल रहा है")
    next()
}

// Route handler
const routeHandler = (req, res) => {
    console.log("3️⃣ Route handler चल रहा है")
    res.send("Response")
}

// सब को लगाओ
app.use(middleware1)
app.use(middleware2)
app.get("/", routeHandler)

// Request आए तो OUTPUT:
// 1️⃣ Middleware 1 चल रहा है
// 2️⃣ Middleware 2 चल रहा है
// 3️⃣ Route handler चल रहा है
// Response भेज दो
```

---

## **7.5 Specific Routes पर Middleware**

```javascript
// सिर्फ /admin routes पर check करना है
const adminMiddleware = (req, res, next) => {
    const isAdmin = true  // assume करते हैं
    if(isAdmin) {
        next()
    } else {
        res.status(403).json({error: "Admin access required"})
    }
}

// Global middleware - सब routes पर
app.use(express.json())

// Specific middleware - सिर्फ /admin पर
app.get("/admin", adminMiddleware, (req, res) => {
    res.send("Admin panel")
})

// यह middleware नहीं लगेगा
app.get("/public", (req, res) => {
    res.send("Public page")
})
```

---

---

# **PART 8: पहला Mini Project**

---

## **🎯 Project: Simple User API**

### **Features:**
```
✅ GET /users - सभी users देखना
✅ POST /users - नया user add करना
✅ GET /users/:id - एक user देखना
✅ PUT /users/:id - user को पूरा update करना
✅ DELETE /users/:id - user को delete करना
✅ PATCH /users/:id - user को आंशिक update करना
```

---

## **Step 1: Project Setup**

```bash
mkdir user-api
cd user-api
npm init -y
npm install express
npm install --save-dev nodemon
```

---

## **Step 2: package.json में script add करो**

```json
{
  "scripts": {
    "dev": "nodemon app.js"
  }
}
```

---

## **Step 3: app.js बनाओ**

```javascript
import express from "express"
const app = express()
const PORT = 5000

// ✅ Middleware
app.use(express.json())

// ✅ In-memory database (database नहीं है, बस array)
let users = [
    {id: 1, name: "राज", email: "raj@email.com"},
    {id: 2, name: "प्रिया", email: "priya@email.com"}
]

// ✅ GET /users - सभी users
app.get("/users", (req, res) => {
    console.log("GET /users - सभी users")
    res.json(users)
})

// ✅ POST /users - नया user add करो
app.post("/users", (req, res) => {
    console.log("POST /users - नया user बनाओ")
    
    const {name, email} = req.body
    
    // Validation
    if(!name || !email) {
        return res.status(400).json({
            error: "Name and email required"
        })
    }
    
    // नया user बनाओ
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    }
    
    users.push(newUser)
    
    res.status(201).json({
        message: "User created",
        user: newUser
    })
})

// ✅ GET /users/:id - एक user देखो
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(`GET /users/${id} - user देखो`)
    
    const user = users.find(u => u.id === id)
    
    if(!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }
    
    res.json(user)
})

// ✅ PUT /users/:id - user को पूरा update करो
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(`PUT /users/${id} - user को update करो`)
    
    const {name, email} = req.body
    
    // Validation
    if(!name || !email) {
        return res.status(400).json({
            error: "Name and email required"
        })
    }
    
    // User को ढूंढो
    const userIndex = users.findIndex(u => u.id === id)
    
    if(userIndex === -1) {
        return res.status(404).json({
            error: "User not found"
        })
    }
    
    // Update करो
    users[userIndex] = {id, name, email}
    
    res.json({
        message: "User updated",
        user: users[userIndex]
    })
})

// ✅ DELETE /users/:id - user को delete करो
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(`DELETE /users/${id} - user को delete करो`)
    
    const userIndex = users.findIndex(u => u.id === id)
    
    if(userIndex === -1) {
        return res.status(404).json({
            error: "User not found"
        })
    }
    
    const deletedUser = users.splice(userIndex, 1)
    
    res.json({
        message: "User deleted",
        user: deletedUser[0]
    })
})

// ✅ PATCH /users/:id - user को आंशिक update करो
app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(`PATCH /users/${id} - user को आंशिक update करो`)
    
    const updateData = req.body
    
    // User को ढूंढो
    const userIndex = users.findIndex(u => u.id === id)
    
    if(userIndex === -1) {
        return res.status(404).json({
            error: "User not found"
        })
    }
    
    // Spread operator से merge करो
    users[userIndex] = {
        ...users[userIndex],
        ...updateData
    }
    
    res.json({
        message: "User updated",
        user: users[userIndex]
    })
})

// ✅ Server start करो
app.listen(PORT, () => {
    console.log(`✅ Server चल रहा है: http://localhost:${PORT}`)
})
```

---

## **Step 4: Server चलाओ**

```bash
npm run dev
```

---

## **Step 5: Postman में Test करो**

### **Test 1: GET /users**
```
GET http://localhost:5000/users
Response:
[
  {id: 1, name: "राज", email: "raj@email.com"},
  {id: 2, name: "प्रिया", email: "priya@email.com"}
]
```

### **Test 2: POST /users**
```
POST http://localhost:5000/users
Body: {
  "name": "अमित",
  "email": "amit@email.com"
}

Response:
{
  "message": "User created",
  "user": {
    "id": 3,
    "name": "अमित",
    "email": "amit@email.com"
  }
}
```

### **Test 3: GET /users/:id**
```
GET http://localhost:5000/users/1
Response:
{id: 1, name: "राज", email: "raj@email.com"}
```

### **Test 4: PUT /users/:id**
```
PUT http://localhost:5000/users/1
Body: {
  "name": "राज कुमार",
  "email": "rajkumar@email.com"
}

Response:
{
  "message": "User updated",
  "user": {
    "id": 1,
    "name": "राज कुमार",
    "email": "rajkumar@email.com"
  }
}
```

### **Test 5: PATCH /users/:id**
```
PATCH http://localhost:5000/users/1
Body: {
  "name": "राज नया"
}

Response:
{
  "message": "User updated",
  "user": {
    "id": 1,
    "name": "राज नया",
    "email": "rajkumar@email.com"
  }
}
```

### **Test 6: DELETE /users/:id**
```
DELETE http://localhost:5000/users/1
Response:
{
  "message": "User deleted",
  "user": {id: 1, name: "राज नया", email: "rajkumar@email.com"}
}
```

---

---

# **PART 9: Quick Reference**

---

## **Commands**
```bash
npm init              # नई project शुरू करो
npm install express   # express install करो
npm install -D nodemon # nodemon install करो
npm run dev          # server चलाओ
node app.js          # direct चलाओ
```

---

## **Express Methods**
```javascript
app.get()     // GET route
app.post()    // POST route
app.put()     // PUT route
app.delete()  // DELETE route
app.patch()   // PATCH route
app.use()     // Middleware लगाओ
app.listen()  // Server start करो
```

---

## **Response Methods**
```javascript
res.send()           // String भेजो
res.json()           // JSON भेजो
res.status()         // Status code लगाओ
res.redirect()       // Redirect करो
res.render()         // Template render करो
```

---

## **HTTP Status Codes**
```
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Server Error
```

---

---

# **🎓 WEEK 1 Summary**

```
✅ Node.js को समझ लिया
✅ npm के साथ काम कर लिया
✅ Express.js setup कर लिया
✅ HTTP Methods सीख लिए (GET, POST, PUT, DELETE, PATCH)
✅ Request-Response cycle समझ लिया
✅ Status codes सीख लीं
✅ Middleware का concept समझ लिया
✅ एक पूरा Mini Project बना लिया
```

---

# **📚 अगले हफ्ते क्या आएगा?**

```
Week 2: Advanced Routing
- Route parameters
- Query strings
- Route ordering
- Router pattern
- Express Router
```

---

**Happy Learning! 🚀**
