const User = require("../models/authModels")
const jwt = require("jsonwebtoken")
const isAuth = async(req,res,next)=>{
    try {
        let token = req.cookies.user
        if(!token){
            return res.status(401).send({message:"You are not authorized to access this resource."})
            }
        else{
            let id = jwt.verify(token, process.env.JWT_STRING)
            req.user = await User.findById({_id : id})
            next()
        }

    } catch (error) {
        res.status(500).send({"message" : "Please Login"})
    }
}

module.exports = isAuth