require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let expiresIn = process.env.JWT_EXPIRES_IN;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: expiresIn });
  } catch (error) {
    console.error(error);
  }
  return token;
};

const verifyJWT = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    data = jwt.verify(token, key);
  } catch (error) {
    console.error(error);
  }
  return data;
};

const checkIsLogin = (req, res, next) => {
  let cookie = req.cookies;
  if (cookie && cookie.jwt) {
    let decoded = verifyJWT(req.cookies.jwt);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EM: "Xin mời đăng nhập trước khi sử dụng chức năng",
        EC: "-1",
        DT: [],
      });
    }
  } else {
    return res.status(401).json({
      EM: "Xin mời đăng nhập trước khi sử dụng chức năng",
      EC: "-1",
      DT: [],
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (req.user) {
    let username = req.user.username;
    let roles = req.user.groupWithRole.Roles;
    let path = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "Tài khoản không có quyền truy cập chức năng này ",
        EC: "-1",
        DT: [],
      });
    }
    let canAccess = roles.some((item) => item.name === path);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EM: "Tài khoản không có quyền truy cập chức năng này",
        EC: "-1",
        DT: [],
      });
    }
  } else {
    return res.status(401).json({
      EM: "Xin mời đăng nhập trước khi sử dụng chức năng",
      EC: "-1",
      DT: [],
    });
  }
};

module.exports = {
  checkIsLogin,
  checkUserPermission,
  createJWT,
  verifyJWT,
};
