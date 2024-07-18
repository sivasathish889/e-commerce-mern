const express = require("express")
const routes = express.Router()
const { LoginPage, LoginController, RegisterPage, RegsiterController, verifyUser, verifyPage } = require("./Controller/authController")
const { HomePage, ProfilePage } = require("./Controller/Home.controller")
const isAuth = require("./middlewere/isAuth")
const fileUpload = require("./middlewere/fileUpload")
const { ProductPage,ProductController } = require("./Controller/products/ProductController")
const {adminContoller, adminPage} = require("./Controller/admin/adminAuthController");


routes.route("/")
    .get(HomePage)

routes.route("/register")
    .get(RegisterPage)
    .post(RegsiterController)

routes.route("/register/verify")
    .post(verifyUser)
    .get(verifyPage)

routes.route("/login")
    .get(LoginPage)
    .post(LoginController)

routes.route("/profile")
    .get(isAuth, ProfilePage)

routes.route("/admin")
    .post(adminContoller)
    .get(adminPage)

routes.route("/admin/products")
    .get(ProductPage)
    .post(ProductController)
module.exports = routes