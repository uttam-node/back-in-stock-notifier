const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Back in Stock API',
            version: '1.0.0'
        }
    },
    apis: ['./src/routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRoutes = require('./src/routes/api');
app.use('/api', apiRoutes);

const { addToQueue } = require('./src/jobs/notificationJob');
addToQueue();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}, Swagger at /api-docs`));