const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ErrorHandler = require('./api/middlewares/ErrorHandler');
const routes = require('./api/routes/LeadsRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://rest-api:To7naqWAkNG7E1zC@cluster0-kh4jw.mongodb.net/test?retryWrites=true');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(ErrorHandler.handleError);

app.listen(port);
