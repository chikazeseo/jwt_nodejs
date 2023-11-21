import express from "express";
const route = express.Router();
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import { checkIsLogin, checkUserPermission } from "../middleware/JWTAction";

const initApiRoutes = (app) => {
  route.post("/register", apiController.handleRegister);
  route.post("/login", apiController.handleLogin);

  // CRUD User
  route.get(
    "/user/read",
    checkIsLogin,
    checkUserPermission,
    userController.read
  );
  route.post("/user/create", userController.create);
  route.put("/user/update", userController.update);
  route.delete("/user/delete", userController.remove);

  return app.use("/api/v1/", route);
};

export default initApiRoutes;
