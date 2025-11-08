const { Question } = require('../Schema/questionSchema');

 
// 🟢 Read All Questions
const getQuestions = async () => {
    return await Question.find().sort({ createdAt: -1 });
};

 
// 🟢 User Vote
const voteQuestion = async (questionId, optionId) => {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const option = question.options.id(optionId);
    if (!option) throw new Error("Option not found");

    option.votes += 1;
    await question.save();
    return question;
};

module.exports = {
    getQuestions,
    voteQuestion
};
