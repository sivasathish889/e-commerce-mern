const jwt = require("jsonwebtoken");
const PostModel = require("../../models/postModel");


const PostPage = async(req, res) => {
  await PostModel.find().then((posts)=>res.send(posts))
};

const PostController =async (req,res)=>{
  try {
    let { name, description,category,  } = req.body
    let token = req.session.user
    let id = jwt.verify(token, process.env.JWT_STRING)
    await PostModel.create({
      name,
      description,
      category,
      image :req.file.path,
      user : id
    })
    res.status(200).json({
      message : "Post Created",
      success : true,
      Error : false
    })
  } catch (error) {
    res.status(400).json({
      message : error.message,
      success : false,
      Error : true
    })
  }
}



module.exports = {
  PostPage,
  PostController
}
