const { db } = require('./db');
const SAVE_GUILD = `INSERT OR IGNORE INTO guilds (id, guild_name) VALUES (?, ?)`;

function saveGuild(guildId, guildName) {
    return db.prepare(SAVE_GUILD).run(guildId, guildName);
}

module.exports = { saveGuild }