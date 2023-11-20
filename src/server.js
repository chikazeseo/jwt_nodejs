require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import connectDB from './configs/connectDB';
import corsConfig from './configs/corsConfig';
const app = express();
corsConfig(app);
// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// config view engine
viewEngine(app);
// init route web
initWebRoutes(app);
// init route api
initApiRoutes(app);
// Connect DB
connectDB();
//Listen
const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT;

app.listen(PORT, HOST_NAME, () => {
    console.log('JWT App is running on port: ' + PORT);
});
