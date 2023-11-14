require('dotenv').config()
import express from 'express';
import viewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();
// config view engine
viewEngine(app);
// init route web
initWebRoutes(app);

//
const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT;

app.listen(PORT, HOST_NAME, () => {
    console.log('JWT App is running on port: ' + PORT);
});
