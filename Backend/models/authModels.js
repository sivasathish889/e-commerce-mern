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
    post : {
        type : mongoose.Types.ObjectId,
        ref : "Post"
        
    }
},{
    timestamps : true
})


let User = mongoose.model("User", userSchema)


module.exports = User
