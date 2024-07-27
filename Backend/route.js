const express = require("express")
const routes = express.Router()
const {  LoginController,  RegsiterController, verifyUser } = require("./Controller/authController")
const { ProfilePage } = require("./Controller/Home.controller")
const {isAuth} = require("./middlewere/isAuth")
const fileUpload = require("./middlewere/fileUpload")
const { PostPage,PostController } = require("./Controller/posts/postController")
const User = require("./models/authModels")


routes.route("/register")
    .post(RegsiterController)

routes.route("/register/verify")
    .post(verifyUser)

routes.route("/login")
    .post(LoginController)

routes.route("/profile")
    .get(isAuth)

routes.route("/posts")
    .post(isAuth, fileUpload, PostController)
    .get(PostPage)


module.exports = routes