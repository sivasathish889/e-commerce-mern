

const HomePage = (req,res)=>{
    res.render("index", {"title" : "home page"})
}

const ProfilePage = (req,res)=>{
    const {username, email, role} = req.user
    res.render("profile", {"title" : username})
}

module.exports = { HomePage, ProfilePage}