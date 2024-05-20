const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');
const path = require('path');
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 4000;
const app = express();

// .Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NodeJs DOC-API-Mongodb",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            },
        ],
    },
    apis: [`${path.join(__dirname, "./router/*.js")}`]
}
const spect = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spect));

// .Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// .Mongo db connection (local)
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/nodeApi')

    .then(() => {
        console.log('successful MongoDB connection');
        // .Router
        app.use('/', router());

        // Start server
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

