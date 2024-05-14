const {Client} = require('discord.js');
require('dotenv').config();
const intents = require('./utils/intents');
const eventHandler = require('./handlers/eventHandler');
const client = new Client({
    intents:intents(),
});
eventHandler(client);
client.login(process.env.TOKEN);