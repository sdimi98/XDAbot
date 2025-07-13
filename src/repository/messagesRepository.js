const { db } = require('./db');

const GET_ALL_MESSAGES_CONTENT = `SELECT content FROM messages;`;
const SAVE_MESSAGE = 'INSERT OR IGNORE INTO messages (id, author_id, guild_id, channel_id, content, timestamp) VALUES (?, ?, ?, ?, ?, ?) ';
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
        new Date(message.createdTimestamp).toISOString()
    );
}

module.exports = { getAllMessagesContent, saveMessage };