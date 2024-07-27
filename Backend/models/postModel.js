const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }

},{
    timestamps : true
})

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel