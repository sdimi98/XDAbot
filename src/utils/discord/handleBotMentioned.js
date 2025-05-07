const { Message } = require('discord.js');
const runModel = require('../python/pythonBridge.js');
let invokedTime = 0;
/** @param {Message} message */
module.exports = async function (message) {
    if (message.mentions.has(message.client.user) && message.content.startsWith(`<@${message.client.user.id}>`)) {
        let currentTime = new Date().getTime();
        if (currentTime - invokedTime <  30 * 1000) {
            message.reply("I am recovering..");
            return;
        }
        invokedTime = currentTime;
        await message.channel.sendTyping();
        const typingLoop = setInterval(() => {
            message.channel.sendTyping().catch(console.error);
        }, 8000);
        try {
            const generatedResponse = await runModel(message.content.replace(`<@${message.client.user.id}>`, '').trim(), 'messageReply.py');
            await message.reply(generatedResponse)
            clearInterval(typingLoop) 
        }
        catch (ex) {
            console.log("Response failed: ", ex)
            await message.reply("Sorry, I failed ;_;")
        }
    }
}