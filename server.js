const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// مفتاح OpenAI ضعيه هنا
const OPENAI_API_KEY = 'ضع-مفتاحك-هنا';

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: req.body.messages
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});