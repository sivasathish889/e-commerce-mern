const ProductPage = (req, res) => {
  res.render("products/product", {
    title: "Product Page",
  });
};

const ProductController = (req,res)=>{

}

module.exports = {
  ProductPage,
  ProductController
}
