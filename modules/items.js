const express = require('express');
const app = express();
const Allnews = require('../Schema/Allnews');

// Fetch all items
// app.get('/', async (req, res) => {
//     try {
//         const items = await Allnews.find();

//         if (items.length === 0) { // Check if items array is empty
//             return res.status(400).json({ message: 'No items found' });
//         }
//         res.status(200).json({ items });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

// Read all posts
app.get('/', (req, res) => {
    Allnews.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});



//fetch all unique category and their count
app.get('/categories', async (req, res) => {
    try {
        const raw = await Allnews.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ])
        // reshape to { category, count }
        const categories = raw.map(c => ({ category: c._id, count: c.count }))
        res.json(categories)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})


// Search products by title
app.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Find products where the title contains the search query (case-insensitive)
        const results = await Post.find({ title: { $regex: query, $options: "i" } });

        res.json({ items: results });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


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
