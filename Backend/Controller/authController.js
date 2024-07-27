const User = require("../models/authModels")
const jwt = require("jsonwebtoken")
const { hashPass, comparePass } = require("../middlewere/bcrypt.controller")
const mailOptions = require("../middlewere/mailSender")

const RegsiterController = async (req,res)=>{
    const {username, email, password1, password2} = req.body
    try {
       if(password1 === password2){
        
        // email validation
        await User.findOne({username:username})
        .then(async(user)=>{
            if(user){
                return res.status(400).json({
                    message : "Username Already Exists",
                    success : false
                   })
            }
        else{
            const hashPassword = hashPass(password1)

            // otp generating
            let otp = Math.floor(Math.random() * 100000 )

            // mail sending
            const subject = `Your Code - ${otp}` 
            const text = `Your OTP is ${ otp }. Use it to verify your email in shiva e-commerce store. This is expired within 5 minutes`
            await mailOptions(email,subject, text)

             // jwt token creating
             const token = jwt.sign({
                "username" : username,
                "email" : email,
                "password" : hashPassword,
                "otp"  : otp
             }, process.env.JWT_STRING)

            //  cookies set
            res.cookie("jwt", token, {secure : true, expires: new Date(Date.now() + 300000)  })
            res.status(200).json({
                message : "Otp send Successfully",
                success : true,
            })
        }
    })
       }
       else{
        res.status(400).json({
            message : "Password does not match",
            success : false,
        })
       }
    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false,
        })
    }
}


const verifyUser =async (req,res)=>{

    const { otp } =await req.body
    
    // otp verification
    try {
        let token = req.headers.cookie.split("=")[1]
        if (token) {

             // jwt verification
            const data = jwt.verify(token, process.env.JWT_STRING)
            const { username, email, password } = data

            if(otp == data.otp){
                await User.create({username, email, password, token })
                res.status(200).json({
                    message : "User Created",
                    success : true,
                })
            }
            else{
                res.status(400).send({
                    message : "Otp does not match",
                    success : false,
                })
            }
        }
        else{
            res.status(400).send({
                message : "Otp expired",
                success : false,
            })
        }
    } catch (error) {
        res.status(400).send({
            message : error.message,
            success : false,
            Error : true
        })
    }

}


const LoginController =async (req,res) =>{
    const {username, password} = req.body
    try {
        if(username && password){
            await User.find({username:username})
            .then((user)=>{
            if(!user.length == 0){
                let hashingPass = comparePass( password, user[0].password)
                if(hashingPass){
                    req.session.user = jwt.sign( user[0]._id.toString(),process.env.JWT_STRING)
                    res.status(200).json({
                        message : "Login Successful",
                        success : true,
                        Error : false
                    })
                }
                else{
                    res.status(400).json({
                        message:"Password is incorrect",
                        success : false,
                        Error : true
                    })
                }               
            }
            else{
                res.status(400).json({ 
                    message : "Please register your details",
                    success : false,
                    Error : true
                })
            }
            })
        }
        else{
            res.status(400).json({
                 message : "Please fill all the fields",
                 success : false,
                 Error : true
                })
        }
    } catch (error) {
        res.status(400).send({
            message : error.message ,
            success : false,
            Error : true
        })
    }
}


module.exports =  {
    LoginController, 
    RegsiterController, 
    verifyUser,  
}