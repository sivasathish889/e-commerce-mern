const mongoose = require("mongoose")


let userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    token : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "user"
    }
},{
    timestamps : true
})


let User = mongoose.model("User", userSchema)


module.exports = User
