const User = require("../models/authModels")
const jwt = require("jsonwebtoken")
const { hashPass, comparePass } = require("../middlewere/bcrypt.controller")
const mailOptions = require("../middlewere/mailSender")


const LoginPage = (req,res)=>{
    res.status(200).render("login", {"title" : "Login Page"})

}

const LoginController =async (req,res) =>{
    const {username, password} = req.body
    console.log(req.headers)

    try {
        if(username || password){
            await User.find({username:username})
            .then((user)=>{
            if(user[0].role  == "user"){
                if(!user.length == 0){
                    let hashingPass = comparePass( password, user[0].password)
                    if(hashingPass){
                        res.cookie("user", jwt.sign( user[0]._id.toString(),process.env.JWT_STRING))
                        res.status(200).redirect("/")
                    }
                    else{
                        res.status(400).json({message:"Password is incorrect"})
                    }
                }
                else{
                    res.status(400).render("login", { "message" : "User not Found"})
                }
            }
            else{
                res.status(400).render("login", { "message" : "User not Found"})
            }
    })
        }
        else{
            res.status(400).render("login", { "message" : "Please fill all the fields"})
        }
    } catch (error) {
        res.status(400).send({"message" : error.message })
    }
}

const RegisterPage = (req, res)=>{
        res.render("register", {"title" : "Register Page"})
}




const RegsiterController = async (req,res)=>{
    const {username, email, password1, password2} = req.body
    try {
       if(password1 === password2){
        
        // email validation
        const user = await User.findOne({username:username})
        if(user){
            res.status(400).render("register", { "message" : "User already exist"})
        }
        else{
            const hashPassword =await hashPass(password1)

            // otp generating
            let otp = Math.floor(Math.random() * 100000 )

            // jwt token creating
            const token = jwt.sign({
                "username" : username,
                "email" : email,
                "password" : hashPassword,
                "otp"  : otp
             }, process.env.JWT_STRING, {expiresIn : "5m"} )

            // mail sending
            const subject = `Your Code - ${otp}` 
            const text = `Your OTP is ${ otp }. Use it to verify your email in shiva e-commerce store. This is expired within 5 minutes`
            mailOptions(email,subject, text)

            //  Cookie set
            res.cookie("jwt" , token, { expires : new Date(Date.now() + 360000)})

            res.status(200).redirect("/register/verify")
        }
       }
       else{
        res.status(400).send({"message" : "Password does not match"})
       }
    } catch (error) {
        res.status(400).send({"message" : error.message})
    }
}


const verifyPage = (req,res)=>{
    res.render("verify", {"title" : "Verify Page"})
}


const verifyUser =async (req,res)=>{

    const {otp} =await req.body
    let token  = req.cookies.jwt

    // jwt verification
    const data = jwt.verify(token, process.env.JWT_STRING)
    const { username, email, password } = data

    // otp verification
    try {
        if (token) {
            if(otp == data.otp){
                await User.create({username, email, password, token })
                res.status(200).redirect("/login")
            }
            else{
                res.status(400).send({"message" : "Otp does not match"})
            }
        }
        else{
            res.status(400).send({"message" : "Otp expired"})
        }
    } catch (error) {
        res.status(400).send({"message" : error.message})
    }

}

module.exports =  {
    LoginPage,
    LoginController, 
    RegisterPage, 
    RegsiterController, 
    verifyUser, 
    verifyPage 
}