import express from "express";
const route = express.Router();
import apiController from '../controller/apiController';

const initApiRoutes = (app) => {
    route.get('/test', apiController.testApi);
    return app.use('/api', route);
}

export default initApiRoutes;
