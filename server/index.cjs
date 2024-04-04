/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// import express from 'express';
// import router from './routes.cjs';
// import { connectToDB } from './db.cjs';
// import dotenv from 'dotenv';
// import cors from 'cors'
const express = require('express');
const router = require('./routes.cjs');
const { connectToDB } = require('./db.cjs');
const dotenv = require('dotenv');
const cors = require('cors');

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