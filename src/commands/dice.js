const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: 'dice',
    description: 'Rolls a dice from 1 to the max value is set. Default max value is 6.',
    options: [
        {
            name: 'dice-size',
            description: 'The maximum value for the dice.',
            type: ApplicationCommandOptionType.Number,
        }
    ],
    permissionsRequired: [],
    callback: (client, interaction) => {
        let max = 6;
        if (!interaction.options.get('dice-size') === false) {
            if (interaction.options.get('dice-size').value <= 0) {
                interaction.reply('Please enter a valid number.')
                return;
            }
            max = interaction.options.get('dice-size').value;
        }

        interaction.reply(Math.ceil(Math.random() * max).toString())
    }
};
