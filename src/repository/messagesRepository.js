const { db } = require('./db');

const GET_ALL_MESSAGES_CONTENT = `SELECT content FROM messages;`;
const SAVE_MESSAGE = 'INSERT OR IGNORE INTO messages (id, author_id, guild_id, channel_id, content, timestamp, reply_to) VALUES (?, ?, ?, ?, ?, ?, ?) ';
const GET_AI_DIALOGUE = `WITH user_pings AS (
SELECT * FROM messages WHERE
    channel_id = :channelId AND
    author_id != :botId AND
    content LIKE '%<@' || :botId || '>%'
    ORDER BY timestamp
    DESC
    LIMIT 12),
bot_replies AS (SELECT m.* FROM messages m JOIN user_pings u ON m.reply_to = u.id WHERE m.author_id = :botId)
SELECT *
FROM ( SELECT * FROM user_pings
          UNION ALL
          SELECT * FROM bot_replies )
ORDER BY timestamp ASC;
 `
function getAllMessagesContent() {
    return db.prepare(GET_ALL_MESSAGES_CONTENT).all().map(r => r.content);
}
function saveMessage(message) {
    return db.prepare(SAVE_MESSAGE).run(
        message.id,
        message.author.id,
        message.guildId,
        message.channelId,
        message.content,
        new Date(message.createdTimestamp).toISOString(),
        message.reference?.messageId ?? null
    );
}

function getAIDialogue(channelId, botId) {
    return db.prepare(GET_AI_DIALOGUE).all({channelId, botId})
}

module.exports = { getAllMessagesContent, saveMessage, getAIDialogue };