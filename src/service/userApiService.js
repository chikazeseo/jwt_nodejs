import db from '../models/index';
const { Op } = require("sequelize");
import bcrypt, { hash } from 'bcryptjs';
import { createJWT } from "../middleware/JWTAction";
import { getRoleUser } from "../service/JWTservice";
var salt = bcrypt.genSaltSync(10);
// Handle internal
const hashPassword = (password) => {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
const fakeUser = async () => {
  try {
    const firstName = ["Nguyễn", "Phạm", "Trịnh", "Huỳnh"];
    const middleName = ["Như", "Bình", "Ngọc", "Thanh", "Trường"];
    const lastName = ["An", "Sinh", "Toàn", "Tùng"];
    for (let index = 0; index < 20; index++) {
      let randomFirstName =
        firstName[Math.floor(Math.random() * firstName.length)];
      let randomMiddleName =
        middleName[Math.floor(Math.random() * middleName.length)];
      let randomLastName =
        lastName[Math.floor(Math.random() * lastName.length)];
      let randomSex = Math.round(Math.random());
      let randomGroup = Math.floor(Math.random() * 2) + 1;
      let username = "user" + index;
      let name = (
        randomFirstName +
        " " +
        randomMiddleName +
        " " +
        randomLastName
      ).trim();
      let email = "test" + index + "@gmail.com";
      let phone = index < 10 ? "012345670" + index : "01234567" + index;
      let password = hashPassword("123456");
      await db.User.create({
        username: username,
        email: email,
        password: password,
        name: name,
        phone: phone,
        sex: randomSex,
        groupId: randomGroup,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
// Compare password
const checkPasswordCorrect = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
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
// handle to controller

const userLogin = async (data) => {
  try {
    let userData = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.username }, { username: data.username }],
      },
    });
    if (userData) {
      let isPassword = checkPasswordCorrect(data.password, userData.password);
      if (isPassword) {
        let roles = await getRoleUser(userData.groupId);
       
        let data = {
          username: userData.username,
          groupWithRole :roles,
        };
        let token = createJWT(data);
        return {
          EM: "Đăng nhập thành công",
          EC: "0",
          DT: {
            access_token: token,
          },
        };
      }
    }
    return {
      EM: "Username/Email hoặc mật khẩu bị sai",
      EC: "3",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Server error service",
      EC: "-1",
    };
  }
};

const userRegister = async (data) => {
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
      groupId: 3,
    });
    return {
      EM: "Tạo người dùng thành công",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Server error",
      EC: "-1",
      DT: [],
    };
  }
};

module.exports = {
    userLogin,
    userRegister,
    fakeUser
}