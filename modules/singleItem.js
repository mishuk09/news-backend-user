const express = require('express');
const app = express();
const Allnews = require('../Schema/Allnews');


// Fetch single item and increment views
app.get('/:id', async (req, res) => {
    try {
        // Find the news by ID
        const singleItem = await Allnews.findById(req.params.id);

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
