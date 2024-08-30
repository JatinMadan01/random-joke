// Import necessary modules
import express from 'express';
import fetch from 'node-fetch';

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Route to fetch a random joke
app.get('/api/jokes/random', async (req, res) => {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Failed to fetch joke');
        const joke = await response.json();
        res.json(joke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch a random image
app.get('/api/images/random', async (req, res) => {
    try {
        const response = await fetch('https://source.unsplash.com/random');
        if (!response.ok) throw new Error('Failed to fetch image');
        // Redirect the user to the random image URL
        res.redirect(response.url);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch both a random joke and image
app.get('/api/random', async (req, res) => {
    try {
        const jokeResponse = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!jokeResponse.ok) throw new Error('Failed to fetch joke');
        const joke = await jokeResponse.json();

        const imageResponse = await fetch('https://source.unsplash.com/random');
        if (!imageResponse.ok) throw new Error('Failed to fetch image');
        const imageUrl = imageResponse.url;

        res.json({
            joke,
            imageUrl
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
