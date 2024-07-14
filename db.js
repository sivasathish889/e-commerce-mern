const mongoose = require("mongoose")
const env = require("dotenv")
env.config()


async function connectDB(){
   try {
    await mongoose.connect(process.env.DB_URL)
    console.log("DB connected");
}
    catch(error) {
        console.log(error.message)
   }
}
module.exports = connectDB