const {Client, IntentsBitField} = require('discord.js');
require('dotenv').config();
const intents = require('./utils/intents');
const client = new Client({
    intents:intents(),
});
client.login(process.env.TOKEN);