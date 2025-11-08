const express = require('express');
const app = express();
const Allnews = require('../Schema/Allnews');


// Fetch single item
app.get('/:id', async (req, res) => {
    try {
        const singleItem = await Allnews.findById(req.params.id);

        if (!singleItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ singleItem });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = app;
