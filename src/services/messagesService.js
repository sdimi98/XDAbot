const { saveMessage, getAllMessagesContent, getAIDialogue } = require('../repository/messagesRepository')
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

function getAIConversationHistory(message){

   return getAIDialogue(message.channelId, message.client.user.id);

}


module.exports = { saveMessageSafely, getAllMessagesContentFromDb, getAIConversationHistory };