const { saveMessage, getAllMessagesContent } = require('../repository/messagesRepository')
const { saveGuildToDb } = require('./guildService')
const { saveUserToDb } = require('./userService')

function saveMessageSafely(message) {
    saveGuildToDb(message.guildId, message.guild?.name ?? 'Unknown Guild');
    saveUserToDb(message.author.id, message.author.username, message.guildId);
    return saveMessage(message);
}

function getAllMessagesContentFromDb() {
    return getAllMessagesContent();
}

module.exports = { saveMessageSafely, getAllMessagesContentFromDb };