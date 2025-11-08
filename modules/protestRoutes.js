const express = require("express");
const {
    getAllProtests,
    getProtestById,
} = require("../controler/protestController");

const router = express.Router();


// 📋 Get All Protests
router.get("/", getAllProtests);

// 📄 Get Single Protest
router.get("/:id", getProtestById);
 

module.exports = router;
