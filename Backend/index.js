import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));
const __dirname = path.resolve();

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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../Frontend/dist')));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
    })
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});