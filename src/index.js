const {Client, IntentsBitField} = require('discord.js');
const intents = require('./utils/intents');
const client = new Client({
    intents:intents(),
});