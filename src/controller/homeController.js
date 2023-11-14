const getHomePage = (req, res) => {
    res.render('home.ejs');
}

const getUserPage = (req, res) => {
    res.render('user.ejs');
}

module.exports = {
    getHomePage,
    getUserPage
}