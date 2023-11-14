const route = express.Router();
import express from "express";
// get Controller
import homeController from "../controller/homeController";

const initWebRoutes = (app) => {
    route.get('/', homeController.getHomePage);
    route.get('/user', homeController.getUserPage);
    return app.use('/', route);
}

export default initWebRoutes;