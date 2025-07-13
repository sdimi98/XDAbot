const { saveUser } = require('../repository/usersRepository');

function saveUserToDb(userId, username, guildId) {
    return saveUser(userId, username, guildId)
}

module.exports = { saveUserToDb }