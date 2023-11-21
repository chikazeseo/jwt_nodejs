import db from '../models/index';
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
const getUserByPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "phone",
        "sex",
        "groupId",
      ],
      include: { model: db.Group, attributes: ["name", "description"] },
      offset: offset,
      limit: limit,
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    if (data) {
      return {
        EM: "Get data success",
        EC: "0",
        DT: data,
      };
    } else {
      return {
        EM: "Get data fail",
        EC: "1",
        DT: [],
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Something wrong in service",
      EC: "-1",
      DT: [],
    };
  }
};

const getAllUser = async () => {
  try {
    let userData = await db.User.findAll({
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "phone",
        "sex",
        "groupId",
      ],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (userData) {
      return {
        EM: "Get data success",
        EC: "0",
        DT: userData,
      };
    } else {
      return {
        EM: "Get data fail",
        EC: "1",
        DT: [],
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Something wrong in service",
      EC: "-1",
      DT: [],
    };
  }
};
const createNewUser = async (data) => {
  try {
    // Check isExist email & user
    let isEmail = await isEmailExist(data.email);
    let isUsername = await isUsernameExist(data.username);
    if (isEmail) {
      return {
        EM: "Email đã tồn tại!",
        EC: "3",
        DT: [],
      };
    }
    if (isUsername) {
      return {
        EM: "Username đã tồn tại!",
        EC: "3",
        DT: [],
      };
    }
    // hash password
    let password = hashPassword(data.password);
    // Create user
    await db.User.create({
      username: data.username,
      email: data.email,
      password: password,
      name: data.name,
      phone: data.phone,
      groupId: data.groupId,
    });
    return {
      EM: "Tạo người dùng thành công",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Server error service",
      EC: "-1",
      DT: [],
    };
  }
};
const updateUser = async (userData) => {
  try {
    let user = await db.User.findOne({
      where: { id: userData.id },
    });
    if (user) {
      await db.User.update(
        {
          username: userData.username,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          groupId: userData.groupId,
        },
        {
          where: {
            id: userData.id,
          },
        }
      );
      return {
        EM: "Chỉnh sửa thông tin người dùng thành công",
        EC: "0",
        DT: [],
      };
    }
    return {
      EM: "Không tìm thấy user",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "Server error service",
      EC: "-1",
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await db.User.destroy({
        where: {
          id: id,
        },
      });
      return {
        EM: "Delete user success",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "Không tìm thấy người dùng",
        EC: "1",
        DT: [],
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Something wrong in service",
      EC: "-1",
      DT: [],
    };
  }
};
// internal handle
const hashPassword = (password) => {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
const isEmailExist = async (email) => {
  try {
    let user = await db.User.findOne({ where: { email: email } });
    if (user === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
const isUsernameExist = async (username) => {
  try {
    let user = await db.User.findOne({ where: { username: username } });
    if (user === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserByPagination,
};
