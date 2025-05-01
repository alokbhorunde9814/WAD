import express from 'express';
import { user } from './db.js';

const app = express();
const port = 3500;

app.use(express.json());

// Create a new user
app.post('/signup', async (req, res) => {
    const userInfo = req.body;
    
    try {
        const existingUser = await user.findOne({ username: userInfo.username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await user.create({
            username: userInfo.username,
            name: userInfo.name,
            password: userInfo.password  // storing password as-is for simplicity
        });

        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

// Login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const existingUser = await user.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful", username: existingUser.username });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Get user by username
app.get("/user/:username", async (req, res) => {
    try {
        const existingUser = await user.findOne({ username: req.params.username });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ username: existingUser.username, name: existingUser.name });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
