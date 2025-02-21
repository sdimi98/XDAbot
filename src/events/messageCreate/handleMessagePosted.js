const { MESSAGE_THRESHOLD } = require('../../../config.json')
const generateMarkovOutput = require('../../utils/generateMarkovOutput');
const messages = [];
const messageSet = new Set();
let messageCounter = 0;
let previousMessage;

module.exports = async (client, message, classifier) => {
    if (message.content === previousMessage) return;
    if (message.author.bot) return;
    messageCounter++;
    previousMessage = message.content;
    if (messageCounter === MESSAGE_THRESHOLD) {
        messageCounter = 0;
        if (Math.random() > 0.5) {
            if (message.author.bot) return;
            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });

            if (messages.length > 1500) {
                const removedItems = messages.splice(0, 100);
                for (const item of removedItems) {
                    messageSet.delete(item);
                }
            }

            fetchedMessages.forEach((message) => {
                if (!messageSet.has(message.content)) {
                    messageSet.add(message.content)
                    messages.push(message.content);
                }
            });



            const markovSentence = generateMarkovOutput(messages);
            message.channel.send(markovSentence)
            console.log("Markov output:", markovSentence);
        }

    }

}