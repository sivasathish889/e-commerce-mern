const mongoose = require("mongoose")

let productSchema = new mongoose.Schema({
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
    oldPrice : {
        type : Number,
    },
    newPrice : {
        type : Number,  
        },
    stock : {
        type :String,
        required : true
    },
    category : {
        type : String,
        required : true
    },

},{
    timestamps : true
})

const productModel = mongoose.model("products", productSchema)

module.exports = productModel