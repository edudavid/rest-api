const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const ErrorHandler = require('./api/middlewares/ErrorHandler')

Lead = require('./api/models/Lead')
mongoose.Promise = global.Promise;
mongoose.connect('url')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/LeadsRoutes');
routes(app);

app.use(ErrorHandler.handleError);

app.listen(port)

console.log('leads REST API started on: ' + port);