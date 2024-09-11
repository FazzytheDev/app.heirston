const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://fawazogunleye:Aabimbola2022@cluster0.caz9xfe.mongodb.net/heirstonvolt?retryWrites=true&w=majority&appName=Cluster0');

const { botStart } = require('./src/controllers/bot'); // Ensure correct path
botStart();
const botToken = '7054215985:AAEGnmBteJxbpQ3mbgqEoUKVx3DDD7QBHA4';
app.post(`/bot${botToken}`, (req, res) => {
    console.log('Webhook received update'); 
    bot.processUpdate(req.body);
    res.sendStatus(200); 
});

app.listen('3000', () => {
    return(`server started!`);
});