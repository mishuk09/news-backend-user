import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    text: String,
    votes: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema(
    {
        questionText: { type: String, required: true },
        options: [optionSchema],
        createdBy: { type: String, default: "admin" },
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
