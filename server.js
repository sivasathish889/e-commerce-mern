const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const path = require("path")
const env = require("dotenv")
const routes = require("./route")
let connectDb = require("./db")
const cookie_parser = require("cookie-parser")
const Logger = require("./middlewere/logger")

// middleware
app.use(express.json())
app.use(cookie_parser())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, "public/css/style.css")))

// Dot env configuration
env.config()

// custom middleware for activity logging
app.use(Logger)

// render engine
app.set("view engine", "ejs")

// Database Connection
connectDb()


// Routes
app.use("/", routes)

// server listen
app.listen(PORT,()=>console.log(`server is running ${PORT}`))