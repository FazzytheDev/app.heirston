const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const {botStart} = require('./src/controllers/bot');

botStart();


app.listen('3000', () => {
    return(`server started!`);
});