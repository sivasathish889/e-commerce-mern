const multer = require("multer")
const { v4 } = require("uuid")


const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null, "./public/media")
        },
        filename : (req,file,cb)=>{
            let uuid  = v4()
            let filname = file.originalname.split(".").pop()
            cb(null, uuid+"."+filname)
        }
    })

const fileUplaod = multer({storage:storage}).single("image")
module.exports = fileUplaod