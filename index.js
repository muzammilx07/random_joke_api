const express = require("express");
const axios = require('axios');

const app = express();
const limit = 3;
const apiKey = '71koDh6OkmD8DWg/0qbqvg==fqbgczR0nDld07nC';

const getJokes = async () => {
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/jokes?limit=${limit}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Request failed:', error.message);
        return null;
    }
};

app.get("/get-joke", async (req, res) => {
    try {
        const jokes = await getJokes();
        res.json({
            result: jokes
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
