import { createSchema } from './db.js';

const models = await createSchema();

async function get(req, res) {
    const words = await models.Words.find();
    res.json(words);
}

async function post(req, res) {

    try {
        const word = new models.Words({
            word: req.body.word,
            definition: req.body.definition,
            example: req.body.example,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        await word.save();
        res.json(word);
    }
    catch(err) {
        res.json({
            error: 'There was an error in POST /words',
            detail: err
        })
    }
}

const controller = {
    get,
    post
}

export default controller;