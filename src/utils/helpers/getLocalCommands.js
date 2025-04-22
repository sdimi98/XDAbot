const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions) => {
    let localCommands = [];
    const commandDir = path.join(__dirname, '../..', 'commands');
    const commandFiles = getAllFiles(commandDir);
    for (commandFile of commandFiles) {
        const commandObject = require(commandFile);
        localCommands.push(commandObject);
    }
    return localCommands;
}