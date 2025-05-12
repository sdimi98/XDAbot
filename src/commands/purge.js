const { ApplicationCommandOptionType, PermissionsBitField, MessageFlags } = require("discord.js");
const { devs } = require('../../config/config.json')

module.exports = {
    name: 'purge-messages',
    description: 'Purges X amount of messages in a specified channel.',
    options: [
        {
            name: 'messages-size',
            description: 'The amount of messages to be scanned for deletion.',
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: [],
    callback: async (interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !devs.includes(interaction.member.id)){
            return interaction.reply({ content: "You are not authorized to use this command.", flags: MessageFlags.Ephemeral });
        }
        await interaction.deferReply();
        const deletionAmount = interaction.options.getNumber('messages-size');
        if (deletionAmount <= 0 || deletionAmount > 400) {
            return interaction.editReply('Please enter a valid number between 1 and 400.');
        }

        let remaining = deletionAmount;
        let lastMessageId = null;
        const messagesToDelete = [];

        while (remaining > 0) {
            const batchSize = Math.min(100, remaining);
            const options = { limit: batchSize };
            if (lastMessageId) options.before = lastMessageId;

            const fetched = await interaction.channel.messages.fetch(options);
            if (fetched.size === 0) break;
            const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
            const now = Date.now();
            const botMessages = fetched.filter(m => 
                m.author.bot &&
                now - m.createdTimestamp < TWO_WEEKS
            );
            messagesToDelete.push(...botMessages.values());

            remaining -= fetched.size;
            lastMessageId = fetched.last().id;
        }

        let deletedCount = 0;
        for (const msg of messagesToDelete) {
            try {
                await msg.delete();
                deletedCount++;
            } catch (err) {
                if (err.code === 10008) {
                    console.warn(`Skipped message (unknown): ${msg.id}`);
                } else {
                    console.error(`Delete failed: ${msg.id}`, err);
                }
            }
        }

        await interaction.channel.send(`Deleted ${deletedCount} bot messages.`);
    }
};