const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://fawazogunleye:Aabimbola2022@cluster0.caz9xfe.mongodb.net/appheirstonhon?retryWrites=true&w=majority&appName=Cluster0');
const {botStart} = require('./src/controllers/bot');
botStart();


app.listen('3000', () => {
    return(`server started!`);
});