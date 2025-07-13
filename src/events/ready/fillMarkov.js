const { markovChannels } = require('../../../config/config.json')
const { getAllMessagesContentFromDb, saveMessageSafely } = require('../../services/messagesService')
const combineMessages = require('../../utils/helpers/combineMessages')


module.exports = async (client, classifier, messages) => {
    console.log("Initiating Markov corpus.");

    const persistentMessagesContent = getAllMessagesContentFromDb();

    if (persistentMessagesContent.length > 0) {
        messages.push(...combineMessages(persistentMessagesContent));
        console.log("Markov loaded from DB with %i messages", messages.length);
        return;
    }

    console.log("No messages found in DB. Fetching from Discord...");

    for (const channelId of markovChannels) {
        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel) continue;

        let lastMessageId = null;
        let remainingMessages = 86000;

        while (remainingMessages > 0) {
            const fetchLimit = Math.min(100, remainingMessages);
            const options = { limit: fetchLimit };
            if (lastMessageId) {
                options.before = lastMessageId;
            }

            const fetchedBatch = await channel.messages.fetch(options);
            if (fetchedBatch.size === 0) break;

            const rawMessages = fetchedBatch.filter(
                m =>
                    m.content &&
                    m.content.trim().length > 0 &&
                    m.author &&
                    m.guild
            );

            const rawLines = rawMessages.map(m => m.content.trim());

            for (const m of rawMessages.values()) {
                try {
                    saveMessageSafely(m);
                } catch (err) {
                    console.log('Failed to save message:', err.message);
                    continue;

                }
            }

            messages.push(...combineMessages(rawLines));
            lastMessageId = fetchedBatch.last().id;
            remainingMessages -= fetchedBatch.size;
        }
    }

    console.log("Markov has been filled with %i messages", messages.length);
};