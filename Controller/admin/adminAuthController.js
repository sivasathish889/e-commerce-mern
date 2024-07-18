const User = require("../../models/authModels");
const bcrypt = require("bcrypt");
const adminContoller = async (req, res) => {
  let { username, password } = req.body;
try {
  await User.find({ username: username }).then((user) => {
    if (user.length > 0) {
      if (user[0].role == "admin") {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if(!err){
            if (result) {
                res.status(200).redirect("/admin/products");
              } else {
                res.status(400).json({ message: "Invalid Password" });
              }
          }
          else{
            res.status(400).json({ message: err.message });
          }
        })
        
      } else {
        res.status(400).json({ message: "You are not admin" });
      }
    } else {
      res.status(400).json({ message: "Login Failed" });
    }
  });
} catch (error) {
  res.send(error.message)
}
};

const adminPage = (req, res) => {
  res.render("admin/admin", { title: "Admin" });
};

module.exports = { adminContoller, adminPage };
