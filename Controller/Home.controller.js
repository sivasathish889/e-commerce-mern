

const HomePage = (req,res)=>{
    res.render("index", {"title" : "home page"})
}

const ProfilePage = (req,res)=>{
    res.render("profile", {"title" : "Profile Page"})
}

module.exports = { HomePage, ProfilePage}