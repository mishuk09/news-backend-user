const express = require('express');
const app = express();
const Topnews = require('../Schema/Topnews');

 
// ADD Front News
app.post('/front-news', async (req, res) => {
    try {
        const news = new Topnews(req.body);
        await news.save();
        res.status(201).json({ message: "Front news added", data: news });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET Front News
app.get('/front-news', async (req, res) => {
    try {
        const news = await Topnews.find().sort({ createdAt: -1 }); 
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 

// Fetch single item and increment views
app.get('/:id', async (req, res) => {
    try {
        // Find the news by ID
        const singleItem = await Topnews.findById(req.params.id);

        if (!singleItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Increment views
        singleItem.views = (singleItem.views || 0) + 1;
        await singleItem.save();

        // Send the updated news
        res.status(200).json({ singleItem });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
 

module.exports = app;
