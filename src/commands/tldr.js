const { ApplicationCommandOptionType } = require("discord.js");
const runModel = require('../utils/python/pythonBridge.js');

module.exports = {
    name: 'tldr',
    description: 'Summarizes a single message',
    options: [
        {
            name: 'text',
            description: 'What you want summarized.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    permissionsRequired: [],
    callback: async (client, interaction) => {

        console.log("TLDR summarization invoked.")
        await interaction.deferReply();
        let receivedMessage = interaction.options.getString('text');
        if (!receivedMessage || !receivedMessage.trim()) {
            await interaction.editReply('Please provide some text to summarize.');
            return;
        }
        try {
            const summary = await runModel(receivedMessage, 'textSummarizer.py');
            console.log("Generated summary:", summary);
            await interaction.editReply(summary);
        } catch (error) {
            console.error("Summarization error:", error);
            await interaction.editReply("An error occurred while summarizing your text.");
        }
    }
};