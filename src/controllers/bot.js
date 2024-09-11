const botStart = () => {
    const { User } = require('../models/User');
    const TelegramBot = require('node-telegram-bot-api');
    const botToken = '7054215985:AAEGnmBteJxbpQ3mbgqEoUKVx3DDD7QBHA4';
    const bot = new TelegramBot(botToken, { webHook: true });
    const webhookUrl = `https://app-heirston-kw9o.onrender.com/bot${botToken}`;
    bot.setWebHook(webhookUrl).then(() => {
        console.log(`Webhook successfully set at: ${webhookUrl}`);
    }).catch(error => {
        console.error('Error setting webhook:', error);
    });
    bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
        const chatId = msg.chat.id.toString(); // Consistent format for Telegram ID
        const referralCode = match[1]; 
        const username = msg.chat.username;
        try {
            let user = await User.findOne({ telegramId: chatId });
            if (!user) {
                user = new User({
                    telegramId: chatId,
                    username: username,
                    balance: 0,
                    referredBy: referralCode || null
                });

                // for referral logic
                if (referralCode) {
                    const referrer = await User.findOne({ telegramId: referralCode });
                    if (referrer) {
                        referrer.referredUsers.push(chatId);
                        referrer.balance = (referrer.balance || 0) + 1000;
                        await referrer.save();
                    }
                }
                await user.save();
                bot.sendMessage(chatId, `Welcome to the world of Heirs, ${username}. Where our ton shall set you free!`);
            } else {
                bot.sendMessage(chatId, `Missed you ${username}, let's get back to business!`);
            }
        } catch (error) {
            console.error('Error handling /start command:', error);
            bot.sendMessage(chatId, `Sorry, something went wrong. Please try again later.`);
        }
    });
}

module.exports = {
    botStart
}
