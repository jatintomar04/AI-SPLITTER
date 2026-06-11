const express = require("express");
const connectDB = require("./config/dbConfig");
require("dotenv").config()
const cors = require('cors')
const { initializeSocket } = require("./socket/socket");
const http = require("http");


const app = express()
const PORT= process.env.PORT ||5000;
connectDB()

const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  credentials: true
}));


app.get("/",(req,res)=>{
    res.json({
        message :"Welcome To AI-Splittor Api"
    })
})

// auth routes 

app.use("/api/auth",require("./routes/authRoutes"))

// expense routes 

app.use("/api/expense",require("./routes/expenseRoutes"))

// user routes
app.use("/api/user",require("./routes/userRoutes"))

// group routes 
app.use("/api/group",require("./routes/groupRoutes"))

// ai routes
app.use("/api/ai",require("./routes/aiRoutes"))

server.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT :${PORT}`)
})


