import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const entrySchema = new mongoose.Schema({
    flower: String,
    date: String
});

const Entry = mongoose.model('Entry', entrySchema);


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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

// Your routes go here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});