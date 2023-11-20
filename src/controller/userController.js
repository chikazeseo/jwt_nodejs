import crudUserService from '../service/crudUserService';

const read = async (req, res) => {
    try {
        let data = await crudUserService.getAllUser();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.error(error);
    }
}

const create = async (req, res, next) => {
    try {
        let userData = await crudUserService.createUser();
    } catch (error) {
        console.error(error);
    }
}

const update = async (req, res, next) => {
    try {
        let data = await crudUserService.updateUser();
        return {
            EM: data.EM,
            EC: data.EC,
            DT: data.data
        }
    } catch (error) {
        console.error(error);
    }
}

const remove = async (req, res, next) => {
    try {
        let userData = await crudUserService.deleteUser();
    } catch (error) {
        console.error(error);
    }
}

module.exports = { read, create, update, remove }