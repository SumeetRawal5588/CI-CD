const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Body parser for JSON
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://Sumeet:DnCwPQjvfiSbs9fq@cluster0.aomhndt.mongodb.net/TestDB1")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

// Schema + Model
const userSchema = new mongoose.Schema({
    name: String,
    time: Date
});
const User = mongoose.model("User", userSchema);

// Serve HTML
app.use(express.static(__dirname));

// 👉 INSERT API
app.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).send("Name is required");

        await User.create({
            name,
            time: new Date()
        });
        res.send(`Data Inserted 🚀 ("${name}")`);
    } catch (err) {
        res.status(500).send("Error inserting data");
    }
});

// 👉 DELETE API
app.delete('/delete', async (req, res) => {
    try {
        await User.deleteMany({});
        res.send("All users deleted 🗑️");
    } catch (err) {
        res.status(500).send("Error deleting data");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});