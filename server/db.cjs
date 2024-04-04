/* eslint-disable no-undef */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDB = async () => {
    const URI = process.env.MONGO_URI;

    await mongoose.connect(URI,{
        dbName: 'DBHangmanGame',
            retryWrites: true,
            w: 'majority',
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Error on DB', err);
    });   
}

const createSchema = async () => {
    const WordsSchema = mongoose.Schema({
        word: {
            type: String,
            required: true,
            unique: true,    
        },
        definition: {
            type: String,
            required: false,
        },
        example: {
            type: String,
            required: false,
        },
        createdAt: Date,
        updatedAt: Date,
    })

    const Words = mongoose.model('Words', WordsSchema, 'words');

    return {
        Words
    }
}


export {
    connectToDB,
    createSchema
}