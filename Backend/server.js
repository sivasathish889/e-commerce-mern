const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const path = require("path")
const env = require("dotenv")
const routes = require("./route")
let connectDb = require("./db")
const Logger = require("./middlewere/logger")
const session = require("express-session")
const cors = require("cors")
const cookieParser = require('cookie-parser');

// CORS
app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE"]
}))

// Dot env configuration
env.config()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser());
app.use(session({
    secret : process.env.SESSION_SECRET, 
    saveUninitialized : false,
    resave : false,
    cookie : {
        secure : true,
        maxAge : 300000 ,
        sameSite : false,
        httpOnly  : true
    }
}))


// custom middleware for activity logging
app.use(Logger)


// Database Connection
connectDb()


// Routes
app.use("/", routes)

// server listen
app.listen(PORT,()=>console.log(`server is running http://localhost:${PORT}/`))