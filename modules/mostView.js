const express = require('express');
const app = express();
const Allnews = require('../Schema/Allnews');


// Get all news sorted by views (most-read first)
app.get('/', async (req, res) => {
    try {
        const mostRead = await Allnews.find()
            .sort({ views: -1 }); // Sort by views descending

        res.status(200).json({ mostRead });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});





module.exports = app;
