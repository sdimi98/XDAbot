const { markovChannels } = require('../../../config/config.json')

module.exports = (client, classifier, messages) => {
    console.log("Initiating Markov corpus.")
    markovChannels.forEach(async channelId => {
        const channel = await client.channels.fetch(channelId).catch(() => null);

        let lastMessageId = null;
        let remainingMessages = 86000;
        while (remainingMessages > 0) {
            const fetchLimit = Math.min(100, remainingMessages);
            const options = { limit: fetchLimit };
            if (lastMessageId) {
                options.before = lastMessageId;
            }

            const fetchedBatch = await channel.messages.fetch(options);

            const rawLines = fetchedBatch
                .filter(m => m.content && m.content.split(' ').length > 0)
                .map(m => m.content.trim());

            const combinedLines = [];
            try{
            for (let i = 0; i < rawLines.length; i++) {
                const words = rawLines[i].split(' ');
                if (words.length === 2 && i + 1 < rawLines.length) {
                    const combined = rawLines[i] + ' ' + rawLines[i + 1];
                    combinedLines.push(combined);
                    i++;
                } else {
                    combinedLines.push(rawLines[i]);
                }
            }

            messages.push(...combinedLines);
            lastMessageId = fetchedBatch.last().id;
            remainingMessages -= fetchedBatch.size;}
            catch (error){
                console.log(`There was an error filling Markov corpus: ${error}`)
                break;
            }
        }
        console.log("Markov has been filled with %i messages", messages.length)
    });

};