const { saveGuild } = require('../repository/guildRepository');


function saveGuildToDb(guildId, guildName) {

    return saveGuild(guildId, guildName);

}


module.exports = { saveGuildToDb }