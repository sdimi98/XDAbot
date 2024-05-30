module.exports = {
    name:'ping',
    description:'says pong',
    permissionsRequired: [],
    callback: (client,interaction) =>{
        interaction.reply('pong')
},
};