# multiple methods on same route using app.route

app.route("/user")

    .get((req,res)=>{
        res.send("Get user data")
    })

   .post("/user",(req,res)=>{
    res.send("Create new user")
   })

   .put("/user",(req,res)=>{    
    res.send("Update user data")
   })

   .patch("/user",(req,res)=>{      
    res.send("Patch user data")
   } )

   .delete("/user",(req,res)=>{      
    res.send("Delete user data")
   })




   # एक ही path पर multiple methods को एक साथ define करना

// Traditional तरीका:
app.get("/users/:id", (req, res) => { /* ... */ })
app.put("/users/:id", (req, res) => { /* ... */ })
app.delete("/users/:id", (req, res) => { /* ... */ })
app.patch("/users/:id", (req, res) => { /* ... */ })

// Chaining तरीका:
app.route("/users/:id")
    .get((req, res) => { /* GET handler */ })
    .put((req, res) => { /* PUT handler */ })
    .delete((req, res) => { /* DELETE handler */ })
    .patch((req, res) => { /* PATCH handler */ })


# ❌ गलत तरीका (सब एक file में)
app.get("/users", ...)
app.post("/users", ...)
app.get("/products", ...)
app.post("/products", ...)
app.get("/orders", ...)
app.post("/orders", ...)
// ... 1000+ lines 😱

// ✅ सही तरीका (routes को अलग files में)
routes/
  ├── userRoutes.js    (सभी /users से related)
  ├── productRoutes.js (सभी /products से related)
  ├── orderRoutes.js   (सभी /orders से related)
  └── index.js         (सब को import करो)