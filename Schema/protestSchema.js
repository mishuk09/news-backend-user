const mongoose = require("mongoose");

const protestSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        authorName: { type: String, required: true },
        authorImage: { type: String, default: "" },
       
    },
    { timestamps: true }
);

const Protest = mongoose.model("Protest", protestSchema);

module.exports = Protest;
