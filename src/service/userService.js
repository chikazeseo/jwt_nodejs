import db from '../models/index'
import bcrypt, { hashSync } from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

const deleteUser = async (idUser) => {
    try {
        await db.User.destroy({
            where: {
                id: idUser
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const getAllUser = async () => {
    try {
        let data = await db.User.findAll();
        return data
    } catch (error) {
        console.error(error);
    }
};
const getUserById = async (idUser) => {
    try {
        let data = await db.User.findOne({ where: { id: idUser } });
        return data
    } catch (error) {
        console.error(error);
    }
}
const storeUser = async (username, password, email) => {
    try {
        let hashPass = hashPassword(password);
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (error) {
        console.error(error);
    }
};
const updateUser = async (idUser, username, password, email) => {
    try {
      if (password == null) {
        await db.User.update(
          {
            username: username,
            email: email,
          },
          {
            where: { id: idUser },
          }
        );
      } else {
        let hashPass = hashPassword(password);
        await db.User.update(
          {
            username: username,
            email: email,
            password: hashPass,
          },
          {
            where: { id: idUser },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
}
const hashPassword = (password) => {

    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = {
    deleteUser,
    getAllUser,
    getUserById,
    storeUser,
    updateUser
}