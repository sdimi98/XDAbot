const { messageThreshold, markovChannels } = require('../../../config/config.json') 
const generateMarkovOutput = require('../../utils/discord/generateMarkovOutput');
const handleBotMentioned = require('../../utils/discord/handleBotMentioned');
const messageSet = new Set();
let messageCounter = 0;
let previousMessage;

module.exports = async (message, classifier, messages) => {
    if (message.content === previousMessage) return;
    handleBotMentioned(message);
    if (markovChannels.length !== 0 && !markovChannels.includes(message.channel.id)) return;
    if (message.author.bot) return;
    messageCounter++;
    previousMessage = message.content;
    if (messageCounter === messageThreshold) {
        messageCounter = 0;
        if (Math.random() > 0.5) {
            if (message.author.bot) return;
            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });

            
            // if (messages.length > 4500) {
            //     console.log("Refreshing messages collection.")
            //     const removedItems = messages.splice(0, 100);
            //     for (const item of removedItems) {
            //         messageSet.delete(item);
            //     }
            // }

            fetchedMessages.forEach((message) => {
                if (!messageSet.has(message.content)) {
                    messageSet.add(message.content)
                    messages.push(message.content);
                }
            });



            const markovSentence = generateMarkovOutput(messages);
            message.channel.send(markovSentence)
            console.log("Markov output:", markovSentence);
            console.log("Messages size: ", messages.length);
        }

    }

}