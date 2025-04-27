const { ApplicationCommandOptionType } = require("discord.js");
const runModel = require('../utils/python/pythonBridge');

module.exports = {
    name: 'summarize',
    description: 'Summarizes the conversation flow of the last X specified messages.',
    options: [
        {
            name: 'messages-size',
            description: 'The maximum amont of messages to be summarized.',
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: [],
    callback: async (client, interaction) => {
        console.log("Summarization invoked.")
        await interaction.deferReply();
        let summarizeAmount = 100;
        let receivedAmount = interaction.options.getNumber('messages-size');
        if (receivedAmount !== null) {
            if (receivedAmount <= 0 || receivedAmount > 600) {
                interaction.reply('Please enter a valid number between 1 and 600.')
                return;
            }
            summarizeAmount = receivedAmount;
        }
        console.log("Fetching ", summarizeAmount, "messages.")
        const fetchedMessages = await interaction.channel.messages.fetch({ limit: summarizeAmount });
        const messagesArray = fetchedMessages
        .filter(m =>
          !m.author?.bot &&
          typeof m.content === "string" &&
          m.content.trim().length 
        )
        .map(m => `${m.author.displayName}: ${m.content.trim()}`)
        .toReversed();

        console.log("Sending ",messagesArray.length," messages to python child.")
        const summary = await runModel(messagesArray, 'messagesSummarizer.py');
        console.log("Generated summary: ", summary);
        await interaction.editReply(summary);
    }
};