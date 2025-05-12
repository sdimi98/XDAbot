const getLocalCommands = require('../../utils/helpers/getLocalCommands');
const { MessageFlags } = require("discord.js");
const { blacklist } = require('../../../config/config.json')


module.exports = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (blacklist.includes(interaction.member.id)) {
        interaction.reply({ content: "You are not authorized to use this command.", flags: MessageFlags.Ephemeral });
        return;
    }
    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;


        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }


        await commandObject.callback(interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};