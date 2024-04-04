/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createSchema } = require('./db.cjs');


async function get(req, res) {
    const models = await createSchema();
    const words = await models.Words.find();
    const wordsSorted = words.sort((a, b) => a.word.localeCompare(b.word));
    
    res.json(wordsSorted);
}

async function post(req, res) {
    const models = await createSchema();

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

// export default controller;
module.exports = controller;