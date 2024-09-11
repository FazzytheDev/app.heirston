const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const {botStart} = require('./src/controllers/bot');

botStart();


app.listen('3000', () => {
    return(`server started!`);
});