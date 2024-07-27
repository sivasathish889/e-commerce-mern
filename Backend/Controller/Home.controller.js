

const ProfilePage = (req,res)=>{
    const {username, email, role} = req.user
    res.json({
        "title" : username})
}

module.exports = { ProfilePage }