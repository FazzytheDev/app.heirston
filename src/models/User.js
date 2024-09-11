const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    balance: {
        type: Number,
    },
    nextClaimTime: {
        type: Date,
        default: Date.now()
    },
    completedTasks: {
        type: Array        
    },
    referredBy: {
        type: String
    },
    referredUsers: [{type: String}]
});
const User = new mongoose.model('User', userSchema);


module.exports = {User};
