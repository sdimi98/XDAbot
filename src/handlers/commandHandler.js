const getLocalCommands = require('../utils/helpers/getLocalCommands')
module.exports = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const localCommands = getLocalCommands();
    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );
        if (!commandObject) return;
        await commandObject.callback(interaction);
    }
    catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
};

