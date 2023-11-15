const route = express.Router();
import express from "express";
// get Controller
import homeController from "../controller/homeController";

const initWebRoutes = (app) => {
    route.get('/', homeController.handleGetUserPage);
    // user
    route.get('/user', homeController.handleGetUserPage);
    route.post('/user/create', homeController.handleCreateUser);
    route.get('/user/edit/:id', homeController.handleEditUser);
    route.post('/user/update', homeController.handleUpdateUser);
    route.post('/user/delete', homeController.handleDeleteUser);
    // return router
    return app.use('/', route);
}

export default initWebRoutes;