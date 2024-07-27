const User = require("../models/authModels")
const jwt = require("jsonwebtoken")
const isAuth = async(req,res,next)=>{
    try {
        let token = req.session?.user
        if(!token){
            return res.status(401).send({
                message:"Please Login.",
                success : false,
                Error : true
            })
            }
        else{
            let id = jwt.verify(token, process.env.JWT_STRING)
            req.user = await User.findById({_id : id})
            next()
        }

    } catch (error) {
        res.status(500).send({
            message : "Please Login",
            success : false,
            Error : true
        })
    }
}


module.exports ={
    isAuth 
}