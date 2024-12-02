import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectMongoDB from './db/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

/**
 *  This file 
 *   - Adds cors, express, api routes.
 *   - GET endpoint for hellos
 *   - Connects MongoDB
 *   - Starts server.
 */

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALLE!!!'
    });
});

const startServer = async () => {
    try {
        connectMongoDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log('Server running on port: '  + process.env.PORT + ' }'));
    } catch (error) {
        console.log(error);
    }
};

startServer();
