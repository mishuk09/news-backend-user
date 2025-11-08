const express = require('express');
const {
    createQuestion,
    getQuestions,
    voteQuestion
} = require('../controler/questionModule.js');

const app = express();

 

// 📋 Get All Questions
app.get("/question", async (req, res) => {
    const data = await getQuestions();
    res.json(data);
});


// 🗳️ Vote (User)
app.post("/question/:id/vote/:optionId", async (req, res) => {
    try {
        const data = await voteQuestion(req.params.id, req.params.optionId);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = app;
