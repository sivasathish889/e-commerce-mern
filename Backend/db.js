const mongoose = require("mongoose")

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