import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Define Schema and Model
const entrySchema = new mongoose.Schema({
    flower: String,
    date: String
});

const Entry = mongoose.model('Entry', entrySchema);

// API Route to Save Form Data
app.post('/submit', async (req, res) => {
    const { flower, date } = req.body;

    if (!flower || !date) {
        return res.status(400).json({ error: "Please fill in both fields! 😅" });
    }

    try {
        const newEntry = new Entry({ flower, date });
        await newEntry.save();
        res.json({ message: "Data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save data!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});