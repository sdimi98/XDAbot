const { ApplicationCommandOptionType } = require("discord.js");
const runModel = require('../utils/python/pythonBridge');

module.exports = {
    name: 'summarize',
    description: 'Summarizes the conversation flow of the last X specified messages.',
    options: [
        {
            name: 'messages-size',
            description: 'The maximum amount of messages to be summarized.',
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: [],
    callback: async (interaction) => {
        console.log("Summarization invoked.")
        await interaction.deferReply();
        let summarizeAmount = 100;
        let receivedAmount = interaction.options.getNumber('messages-size');
        if (receivedAmount !== null) {
            if (receivedAmount <= 0 || receivedAmount > 200) {
                interaction.editReply('Please enter a valid number between 1 and 200.')
                return;
            }
            summarizeAmount = receivedAmount + 1;
        }
        console.log("Fetching ", summarizeAmount, "messages.")

        const fetchedMessages = [];
        let remainingMessages = summarizeAmount;
        let lastMessageId = null;
        while (remainingMessages > 0) {
            const fetchLimit = Math.min(100, remainingMessages);
            const options = { limit: fetchLimit };
            if (lastMessageId) {
                options.before = lastMessageId;
            }

            const messages = await interaction.channel.messages.fetch(options);

            if (messages.size === 0) break;

            fetchedMessages.push(...messages.values());
            lastMessageId = messages.last().id;
            remainingMessages -= messages.size;

        }
        const messagesArray = fetchedMessages
            .filter(m =>
                !m.author?.bot &&
                typeof m.content === "string" &&
                m.content.trim().length
            )
            .map(m => `${m.member?.displayName || m.author.username}: ${m.content.trim()}`)
            .toReversed();

        if (messagesArray.length === 0) {
            await interaction.editReply("No messages sent to summarizer.");
            return;
        }

        console.log("Sending ", messagesArray.length, " messages to python child.")
        const summary = await runModel(messagesArray, 'messagesSummarizer.py');
        console.log("Generated summary: ", summary);
        await interaction.editReply(summary);
    }
};