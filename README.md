# Backend API - Complete Learning Guide 🚀

Ek **Express.js + MongoDB** backend जहाँ User Authentication, JWT Tokens, और Password Security सब कुछ सीखो!

---

## 📚 Table of Contents

1. [Architecture](#architecture)
2. [Project Structure](#project-structure)
3. [Installation & Setup](#installation--setup)
4. [How to Run](#how-to-run)
5. [API Endpoints](#api-endpoints)
6. [Database Models](#database-models)
7. [Authentication Flow](#authentication-flow)
8. [Detailed Concepts](#detailed-concepts)

---

## 🏗️ Architecture

यह project **Layered Architecture** follow करता है:

```
Request आता है
    ↓
Routes (किस endpoint को call करना है)
    ↓
Middlewares (verify करना है authorization)
    ↓
Controllers (Business Logic)
    ↓
Models (Database के साथ काम)
    ↓
Response भेजो
```

### Files का Role:

| Folder | File | काम |
|--------|------|------|
| `routes/` | `auth_route.js` | Login, Signup endpoints |
| `routes/` | `user_route.js` | User Profile endpoints |
| `controllers/` | `auth_controller.js` | Authentication logic |
| `controllers/` | `user_controller.js` | User data logic |
| `models/` | `user_model.js` | Database schema + Methods |
| `middlewares/` | `is_Auth_middlewares.js` | JWT verification |
| `config/` | `db.js` | MongoDB connection |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.js              # Server शुरू करता है
│   ├── app.js                 # Express app बनाता है
│   │
│   ├── config/
│   │   └── db.js              # MongoDB Connection
│   │
│   ├── models/
│   │   └── user_model.js      # User Schema + Methods
│   │
│   ├── routes/
│   │   ├── auth_route.js      # /api/v1/auth/ routes
│   │   └── user_route.js      # /api/v1/user/ routes
│   │
│   ├── controllers/
│   │   ├── auth_controller.js # signup, signin, logout logic
│   │   └── user_controller.js # getProfile, updateProfile logic
│   │
│   ├── middlewares/
│   │   └── is_Auth_middlewares.js  # JWT verification
│   │
│   └── utils/
│       └── apiError.js        # Error handling (optional)
│
├── package.json               # Dependencies
└── .env                        # Environment variables
```

---

## 🛠️ Installation & Setup

### Step 1: Dependencies Install करो

```bash
npm install
```

यह सब packages install करेगा:
- **express** - Web server
- **mongoose** - MongoDB के साथ काम
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **cookie-parser** - Cookies को read करने के लिए
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Step 2: .env File बनाओ

Project root में एक `.env` file बनाओ:

```env
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/backend

# Server Port
PORT=13000

# JWT Secrets
ACCESS_TOKEN_SECRET_KEY=your_secret_key_here
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret_here

# Token Expiry
ACCESS_TOKEN_EXPIRY_KEY=15m
REFRESH_TOKEN_EXPIRY_KEY=7d

# Backup
SECRET_DATA_PASSWORD=Akash@12345
```

**कहाँ से values लो?**
- `MONGODB_URL` - अपना MongoDB URI (local या cloud)
- `ACCESS_TOKEN_SECRET_KEY` - कोई भी random string (जितना लंबा उतना अच्छा)
- `REFRESH_TOKEN_SECRET_KEY` - अलग random string

### Step 3: MongoDB चलाओ

```bash
# अगर MongoDB locally installed है:
mongod

# अगर MongoDB Atlas cloud है तो:
# .env में cloud URI डालो
```

---

## ▶️ How to Run

### Development Mode (nodemon के साथ - auto reload)

```bash
npm run dev
```

Output:
```
Server is live on http://localhost:13000
MongoDB connected Successfully
```

### Production Mode

```bash
npm start
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth/`)

#### 1️⃣ **Signup - नया User बनाना**

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "Akash Patel",
  "username": "akash_patel_01",
  "email": "akash@gmail.com",
  "password": "Akash@123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User Signin Successfully",
  "createUser": {
    "_id": "123456",
    "name": "Akash Patel",
    "username": "akash_patel_01",
    "email": "akash@gmail.com",
    "createdAt": "2025-01-29T10:30:00.000Z"
  }
}
```

**क्या होता है internally?**
1. सभी fields check होते हैं (mandatory)
2. Username unique है या नहीं check होता है
3. Email unique है या नहीं check होता है
4. Password **bcrypt** से hash होता है (15 rounds)
5. User database में save हो जाता है

#### 2️⃣ **Signin - Login करना**

```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "username": "akash_patel_01",
  "password": "Akash@123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User Login Successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123456",
    "name": "Akash Patel",
    "username": "akash_patel_01",
    "email": "akash@gmail.com"
  }
}
```

**क्या होता है internally?**
1. Username से user find होता है
2. Password को `isPasswordMatched()` method से verify होता है
3. Access Token बनता है (15 मिनट valid)
4. Refresh Token बनता है (7 दिन valid)
5. Tokens और User data return होता है

#### 3️⃣ **Signout - Logout करना** 🔐

```http
POST /api/v1/auth/signout
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "User Logged Out Successfully"
}
```

**जरूरत:** Access Token (Protected Route)

#### 4️⃣ **Change Password** 🔐

```http
POST /api/v1/auth/change-password
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "oldPassword": "Akash@123",
  "newPassword": "NewPassword@456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password Changed Successfully"
}
```

**जरूरत:** Access Token (Protected Route)

#### 5️⃣ **Refresh Token - नया Access Token बनाना**

```http
POST /api/v1/auth/new-refresh-token
Authorization: Bearer {refreshToken}
```

**Response:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### User Routes (`/api/v1/user/`)

#### 1️⃣ **Get Profile** 🔐

```http
GET /api/v1/user/get-profile
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "User Profile Fatch Successfully",
  "user": {
    "user": {
      "_id": "123456",
      "name": "Akash Patel",
      "username": "akash_patel_01",
      "email": "akash@gmail.com",
      "createdAt": "2025-01-29T10:30:00.000Z"
    }
  }
}
```

**क्या होता है?**
- Middleware सें token verify होता है
- `req.user` में logged-in user की info आ जाती है
- Profile return होता है

#### 2️⃣ **Suggested Users** 🔐

```http
GET /api/v1/user/suggested-user
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "suggestedUsers": [
    {
      "_id": "789012",
      "name": "Raj Kumar",
      "username": "raj_kumar",
      "email": "raj@gmail.com"
    },
    {
      "_id": "345678",
      "name": "Priya Singh",
      "username": "priya_singh",
      "email": "priya@gmail.com"
    }
  ]
}
```

**क्या होता है?**
- Current user को छोड़कर सभी users मिलते हैं
- Password field remove रहती है (security)

#### 3️⃣ **Update Profile** 🔐

```http
PATCH /api/v1/user/update-profile
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Akash Patel Updated",
  "username": "akash_updated"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile Updated Successfully",
  "updatedUser": {
    "_id": "123456",
    "name": "Akash Patel Updated",
    "username": "akash_updated",
    "email": "akash@gmail.com"
  }
}
```

---

## 💾 Database Models

### User Schema (`src/models/user_model.js`)

```javascript
{
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true
  },
  refreshToken: {
    type: String
  },
  timestamps: true  // createdAt, updatedAt automatically
}
```

### Pre-Save Hook (Password Hashing)

```javascript
userSchema.pre("save", async function(){
  // अगर password modify नहीं हुआ तो बाहर निकल जाओ
  if(!this.isModified("password"))
    return 

  // 15 rounds का salt बनाओ (ज्यादा secure)
  const genSalt = await bcrypt.genSalt(15)

  // Password को hash करो
  this.password = await bcrypt.hash(this.password, genSalt)
})
```

**क्यों?** → Database में plain text password मत जाए!

---

## 🔐 Authentication Flow

### Complete Signup to Login Journey:

```
┌─────────────────────────────────────────┐
│ 1. USER SIGNUP                          │
├─────────────────────────────────────────┤
│ POST /signup                            │
│ {name, username, email, password}       │
└──────────┬────────────────────────────┬┘
           │                            │
           ▼ Check करो               ▼ Check करो
      Username unique?             Email unique?
      ↓                            ↓
   (सफल)                        (सफल)
      │                            │
      └────────┬───────────────────┘
               │
               ▼
      Password को bcrypt से hash करो
      (Plain: "Akash@123" → 
       Hashed: "$2b$15$...")
               │
               ▼
      User database में save करो
               │
               ▼
      Response: ✅ User Created
```

```
┌─────────────────────────────────────────┐
│ 2. USER LOGIN                           │
├─────────────────────────────────────────┤
│ POST /signin                            │
│ {username, password}                    │
└──────────┬────────────────────────────┬┘
           │
           ▼ Find user by username
      User मिला?
      │
      ├─ नहीं → ❌ 404 "User Not Found"
      │
      └─ हाँ
         │
         ▼ Password compare करो
         (bcrypt.compare)
         │
         ├─ Not Match → ❌ 400 "Wrong Password"
         │
         └─ Match! ✅
            │
            ▼
      Access Token बनाओ (15m)
      {_id, name, email, username}
            │
            ▼
      Refresh Token बनाओ (7d)
      {_id}
            │
            ▼
      Response: ✅ Both Tokens + User
```

```
┌─────────────────────────────────────────┐
│ 3. PROTECTED REQUEST                    │
├─────────────────────────────────────────┤
│ GET /user/profile                       │
│ Header: Authorization: Bearer {token}   │
└──────────┬────────────────────────────┬┘
           │
           ▼ verifyToken Middleware
      Token मिला?
      │
      ├─ नहीं → ❌ 404 "Token Not Found"
      │
      └─ हाँ
         │
         ▼ JWT से verify करो
         │
         ├─ Invalid → ❌ 401 "Unauthorized"
         ├─ Expired → ❌ 401 "Token Expired"
         │
         └─ Valid ✅
            │
            ▼
      Database से user find करो (by _id)
            │
            ▼
      req.user = user (अब controller access कर सकता है)
            │
            ▼
      Controller: req.user से profile भेज दो
            │
            ▼
      Response: ✅ User Profile
```

---

## 📖 Detailed Concepts

### 1️⃣ Bcrypt - Password Hashing

**क्यों?**
- Plain password database में मत रखो!
- अगर database hack हो जाए तो passwords safe रहें

**कैसे काम करता है?**

```javascript
// Signup में:
const genSalt = await bcrypt.genSalt(15)
this.password = await bcrypt.hash("Akash@123", genSalt)
// Output: "$2b$15$abcd1234efgh5678ijkl9012345678"

// Login में:
const isMatch = await bcrypt.compare(
  "Akash@123",           // जो user ने दिया
  "$2b$15$abcd..."       // जो database में है
)
// Output: true या false
```

**15 क्या है?**
- Salt rounds = कितना secure हो
- ज्यादा = ज्यादा secure लेकिन ज्यादा slow
- 15 = अच्छा balance

### 2️⃣ JWT Tokens

**क्या है?**
- JSON Web Token = एक signed message
- Server के signature के साथ

**Structure:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJfaWQiOiIxMjM0NTYiLCJuYW1lIjoiQWthc2gifQ.
abcd1234efgh5678ijkl9012345678
```

3 parts हैं:
1. **Header** - Algorithm info
2. **Payload** - Data (user info)
3. **Signature** - Server's secret से signed

### 3️⃣ Access Token vs Refresh Token

| | Access Token | Refresh Token |
|---|---|---|
| **Data** | _id, name, email, username | _id only |
| **Use** | हर request में | Token expire होने पर |
| **Expiry** | 15 minutes | 7 days |
| **Security** | ज्यादा risk | कम risk |

**Flow:**

```
Login
  ├─ Access Token (15m) → API calls के लिए
  └─ Refresh Token (7d) → नया access token बनाने के लिए

15 minutes बाद
  Access Token expired ❌
  
Refresh endpoint को call करो
  Refresh Token → नया Access Token
  
7 days बाद
  Refresh Token expired ❌
  
फिर से Login करना पड़े!
```

### 4️⃣ Middleware - verifyToken

```javascript
export const verifyToken = async (req, res, next) => {
    try {
        // Step 1: Token निकालो (cookies या headers से)
        const token = 
            req.cookies?.accessToken || 
            req.headers.authorization?.replace("Bearer ", "")
        
        if(!token) {
            return res.status(404).json({
                success: false,
                message: "Token Not found"
            })
        }
        
        // Step 2: Token को verify करो
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        
        // Step 3: Database से user find करो
        const user = await User.findById(decode?._id).select("-password")
        
        // Step 4: req.user में store करो (controller access कर सकता है)
        req.user = user
        
        // Step 5: अगले middleware/controller को जाने दो
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
```

**कहाँ use होता है?**

```javascript
// Protected route:
authRoute.post("/signout", verifyToken, signout)
//                         ↑
//                    यही middleware
```

---

## 🧪 Testing करो (Postman या cURL से)

### 1. Signup करो:
```bash
curl -X POST http://localhost:13000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Akash",
    "username": "akash_01",
    "email": "akash@gmail.com",
    "password": "Akash@123"
  }'
```

### 2. Login करो:
```bash
curl -X POST http://localhost:13000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "akash_01",
    "password": "Akash@123"
  }'
```

Respone में token मिलेगा - उसे copy करो!

### 3. Protected route call करो:
```bash
curl -X GET http://localhost:13000/api/v1/user/get-profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎯 Key Learnings Summary

| Concept | समझो |
|---------|--------|
| **Architecture** | Routes → Controllers → Models (Layered) |
| **Hashing** | Password को encrypt करके save करो |
| **JWT** | Signed token जिससे user verify हो |
| **Access Token** | हर request में use (short expiry) |
| **Refresh Token** | नया access token बनाने के लिए (long expiry) |
| **Middleware** | Request को process करने से पहले check करो |
| **Methods** | Schema के साथ bind functions |
| **Pre-hooks** | Save से पहले password hash करो |

---

## ❓ Common Issues

### Issue: "MongoDB connected but no data"
**Solution:** `.env` में `MONGODB_URL` सही है?

### Issue: "Token expired"
**Solution:** Refresh token endpoint से नया access token ले

### Issue: "Unauthorized User"
**Solution:** Request में `Authorization: Bearer {token}` header दो

### Issue: "Username Already Exists"
**Solution:** दूसरा username चुन लो

---

## 📚 Next Steps

अब तुम समझ गए:
- ✅ User signup/login कैसे होता है
- ✅ Password कैसे secure रहता है
- ✅ Tokens कैसे काम करते हैं
- ✅ Protected routes कैसे बनाते हैं

**आगे सीखो:**
- Database relations (One-to-Many)
- File upload
- Email verification
- Two-factor authentication

---

## 💬 Questions?

अगर कोई concept नहीं समझा तो पूछ! 😊

---

**Made with ❤️ for Learning**
