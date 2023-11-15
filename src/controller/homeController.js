import userService from '../service/userService';
// Import service


const handleGetHomePage = (req, res) => {
    res.render('home.ejs');
}

const handleGetUserPage = async (req, res) => {
    let arrUsers = await userService.getAllUser();
    res.render('user.ejs', { arrUsers });
}
const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    userService.storeUser(username, password, email);
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.body.id);
    res.redirect('/')
}
const handleEditUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id)
    res.render('edit.ejs', { user })
}
const handleUpdateUser = async (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    let username = req.body.username;
    let password = (req.body.password) ? req.body.password : null;
    await userService.updateUser(id, username, password, email);
    res.redirect('/')
}
module.exports = {
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
    handleGetHomePage,
    handleGetUserPage,
    handleUpdateUser,
}