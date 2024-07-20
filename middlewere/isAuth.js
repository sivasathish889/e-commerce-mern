const User = require("../models/authModels")
const jwt = require("jsonwebtoken")
const isAuth = async(req,res,next)=>{
    try {
        let token = req.session?.user
        if(!token){
            return res.status(401).send({message:"Please Login."})
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

const isAdminAuth =async (req,res,next)=>{
    try {
        let admin = req.session?.admin
        if(!admin){
            return res.status(401).send({message:"Please Login."})
        }
        else{
            let user = jwt.verify(admin, process.env.JWT_STRING)
            req.admin = await User.findById({_id : user.user[0]._id})
            next()
            }
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports ={
    isAuth,
    isAdminAuth 
}