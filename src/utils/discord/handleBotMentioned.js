const { Message, MessageFlags } = require('discord.js');
const runModel = require('../python/pythonBridge.js');
const { blacklist } = require('../../../config/config.json')
const { getAIConversationHistory, saveMessageSafely } = require('../../services/messagesService.js')

let invokedTime = 0;
/** @param {Message} message */
module.exports = async function (message) {
    if (message.mentions.has(message.client.user) && message.content.startsWith(`<@${message.client.user.id}>`)) {
        if (blacklist.includes(message.member.id)) {
            return;
        }
        saveMessageSafely(message);
        const history = getAIConversationHistory(message)
        console.log(history);
        const formattedHistoryPrompt = history.map(m =>({
            role: m.author_id === message.client.user.id ? 'assistant': 'user',
            content: m.content

        }))
        console.log(formattedHistoryPrompt);
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
            const generatedResponse = await runModel({messages: formattedHistoryPrompt}, 'messageReply.py');
            const chunks = generatedResponse.match(/.{1,2000}/gs);

            for (let i = 0; i < chunks.length; i++) {
                if (i === 0) {
                    await message.reply(chunks[i]);
                } else {
                    await message.channel.send(chunks[i]);
                }
            }

            clearInterval(typingLoop) 
        }
        catch (ex) {
            console.log("Response failed: ", ex)
            await message.reply("Sorry, I failed ;_;")
            clearInterval(typingLoop)
        }
    }
}