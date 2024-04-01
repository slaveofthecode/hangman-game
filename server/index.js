/* eslint-disable no-undef */
import express from 'express';
import router from './routes.js';
import { connectToDB } from './db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Test API is Ok');
}); 

server.use('/words', router);

const init = async () => {
    await connectToDB();

    const port = process.env.SERVER_PORT || 3001;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

};

init();