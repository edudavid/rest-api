const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ErrorHandler = require('./api/middlewares/ErrorHandler')
const routes = require('./api/routes/LeadsRoutes')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'Leads REST API',
        version: '1.0.0',
      },
    },
    apis: ['./api/controllers/*.js', './api/models/*.js'],
  }
);


const app = express()
const port = process.env.PORT || 3000


mongoose.Promise = global.Promise;
mongoose.connect('MONGO_URL')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

app.use(ErrorHandler.handleError);
app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
    swaggerUrl: `http://localhost:${port}/api-docs.json`
}));

app.listen(port)
console.log('leads REST API started on: ' + port);