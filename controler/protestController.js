const Protest = require("../Schema/protestSchema");


// 📋 Read All
const getAllProtests = async (req, res) => {
  try {
    const protests = await Protest.find().sort({ createdAt: -1 });
    res.status(200).json(protests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Read One
const getProtestById = async (req, res) => {
  try {
    const protest = await Protest.findById(req.params.id);
    if (!protest) return res.status(404).json({ message: "Not found" });
    res.json(protest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProtests,
  getProtestById,

};
