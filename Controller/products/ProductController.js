const productModel = require("../../models/productModel")
const ProductPage = (req, res) => {
  res.render("products/product", {
    title: "Product Page",
  });
};

const ProductController =async (req,res)=>{
  try {
    
  } catch (error) {
    res.status(400).json({message : error.message})
  }
}

module.exports = {
  ProductPage,
  ProductController
}
