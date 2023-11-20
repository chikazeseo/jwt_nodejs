import express from "express";
const route = express.Router();
import apiController from '../controller/apiController';
import userController from '../controller/userController';
const initApiRoutes = (app) => {
    route.get('/test', apiController.testApi);
    route.post('/register', apiController.handleRegister);
    route.post('/login', apiController.handleLogin);

    // CRUD User
    route.get('/user/read', userController.read);
    route.post('/user/create', userController.create);
    route.put('/user/update', userController.update);
    route.delete('/user/delete', userController.remove);


    return app.use('/api/v1/', route);
}

export default initApiRoutes;
