module.exports = async ( message, classifier) => {
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            if (attachment.contentType?.startsWith('image/')) {
                const result = await classifier(attachment.url, ['anime-style', 'photograph', 'manga', 'Photorealistic']);
                let animeScore = result.find(item => item.label.toLowerCase() === 'anime-style').score + result.find(item => item.label.toLowerCase() === 'manga').score;
                if (animeScore > 0.70) {
                    message.reply("Anime image detected.")
                }
                console.log(result);
                console.log("Anime score: " + animeScore);
                break;
            }
        }
    }
}