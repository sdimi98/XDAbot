const { ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const runModel = require('../utils/python/pythonBridge.js');

module.exports = {
    name: 'tldr',
    description: 'Summarizes a paragraph of text.',
    options:[],
    permissionsRequired: [],
    callback: async (client, interaction) => {

        const modal = new ModalBuilder({
            customId: `modal-${interaction.user.id}`,
            title: 'Text summarizer'
        })

        const inputText = new TextInputBuilder({
            customId: "inputText",
            label: 'What would you like summarized?',
            style: TextInputStyle.Paragraph
        })

        const actionRow = new ActionRowBuilder().addComponents(inputText)

        modal.addComponents(actionRow);

        await interaction.showModal(modal)

        const submittedModal = await interaction.awaitModalSubmit({
            filter: i => i.customId === `modal-${interaction.user.id}`,
            time: 60_000
        });

        console.log("TLDR summarization invoked.")
        await submittedModal.deferReply();
        let receivedMessage = submittedModal.fields.getTextInputValue('inputText');
        if (!receivedMessage || !receivedMessage.trim()) {
            await submittedModal.editReply('Please provide some text to summarize.');
            return;
        }
        try {
            const summary = await runModel(receivedMessage, 'textSummarizer.py');
            console.log("Generated summary:", summary);
            await submittedModal.editReply(summary);
        } catch (error) {
            console.error("Summarization error:", error);
            await submittedModal.editReply("An error occurred while summarizing your text.");
        }
    }
};