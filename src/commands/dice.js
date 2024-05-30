module.exports = {
    name:'dice',
    description:'dicee',
    permissionsRequired: [],
    callback: (client,interaction) =>{
        interaction.reply(Math.ceil(Math.random() * 6).toString())
    }
};
