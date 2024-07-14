const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const path = require("path")
const env = require("dotenv")
const routes = require("./route")
let connectDb = require("./db")
const cookie_parse = require("cookie-parser")
const Logger = require("./middlewere/logger")

// middleware
app.use(express.json())
app.use(cookie_parse())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, "public")))
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