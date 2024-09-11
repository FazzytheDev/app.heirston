const express = require('express');
const bodyParser = require('body-parser');
const { botStart } = require('./src/controllers/bot'); 
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://fawazogunleye:Aabimbola2022@cluster0.caz9xfe.mongodb.net/heirstonvolt?retryWrites=true&w=majority&appName=Cluster0');

app.use(bodyParser.json());
botStart();

app.listen('3000', () => {
    return(`server started!`);
});