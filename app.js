const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { handleUpdate, setupBotCommands } = require('./src/controllers/bot');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://fawazogunleye:Aabimbola2022@cluster0.caz9xfe.mongodb.net/heirstonvolt?retryWrites=true&w=majority&appName=Cluster0');

// Route for handling webhook updates
app.post(`/bot7054215985:AAEGnmBteJxbpQ3mbgqEoUKVx3DDD7QBHA4`, handleUpdate);

// Set up bot commands
setupBotCommands();

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
