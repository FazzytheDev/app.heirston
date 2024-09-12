const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { setupBotCommands } = require('./src/controllers/bot');
const botRouter = require('./src/routers/botRouter');
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
// Connect to MongoDB
mongoose.connect('mongodb+srv://fawazogunleye:Aabimbola2022@cluster0.caz9xfe.mongodb.net/heirstonvolt?retryWrites=true&w=majority&appName=Cluster0');

// Route for handling webhook updates
app.use('/', botRouter);
app.get('/', async(req, res) => {
    res.render('index');
});
// Set up bot commands
setupBotCommands();
function computeHmacSha256(data, key) {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
}

// Function to validate initData
function validateTelegramData(initData, botToken) {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash'); // Extract hash from initData

    // Remove 'hash' and create data-check-string (sorted and newline-separated)
    urlParams.delete('hash');
    const dataCheckString = Array.from(urlParams.entries())
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join('\n');

    // Compute the secret key
    const secretKey = computeHmacSha256(botToken, 'WebAppData');

    // Compute the HMAC-SHA-256 hash of data-check-string
    const computedHash = computeHmacSha256(dataCheckString, secretKey);

    // Validate the computed hash against the received hash
    if (computedHash !== hash) {
        return false;
    }

    // Check the auth_date to ensure the data is not outdated (5 minutes tolerance)
    const authDate = parseInt(urlParams.get('auth_date'), 10);
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime - authDate > 300) { // 5 minutes = 300 seconds
        return false;
    }

    return true;
}

app.get('/dashboard', async (req, res) => {
    const botToken = '7054215985:AAEGnmBteJxbpQ3mbgqEoUKVx3DDD7QBHA4'; // Your Telegram bot token
    const initData = req.query.initData; // Get initData from query params

    // Validate initData
    if (!validateTelegramData(initData, botToken)) {
        return res.status(403).send('Invalid or expired Telegram data.');
    }

    // Extract Telegram ID from initData
    const urlParams = new URLSearchParams(initData);
    const telegramId = urlParams.get('id');

    // Retrieve user from MongoDB
    let user = await User.findOne({ telegramId });
    if (!user) {
        // Create a new user if one doesn't exist
        user = new User({
            telegramId,
            balance: 0,
            username: urlParams.get('username') || 'Unknown',
            completedTasks: []
        });
        await user.save();
    }

    // Render the dashboard view with the user data
    res.render('dashboard', { user });
});
// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
