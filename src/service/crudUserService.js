import db from '../models/index';


const getAllUser = async () => {
    try {
        let userData = await db.User.findAll({
            attributes: ['id', 'name', 'username', 'email', 'phone', 'sex', 'groupId'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        });
        if (userData) {
            return {
                EM: 'Get data success',
                EC: '0',
                DT: userData
            }
        } else {
            return {
                EM: 'Get data fail',
                EC: '1',
                DT: []
            }
        }
    } catch (error) {
        console.error(error);
        return {
            EM: 'Something wrong in service',
            EC: '-1',
            DT: []
        }
    }
}
const createNewUser = () => {

}
const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser
}
