const { Client } = require('discord.js');
require('dotenv').config({ path: '../config/.env' });
const intents = require('./utils/helpers/intents');
const eventHandler = require('./handlers/eventHandler');
const { loadImageClassifier } = require('./utils/helpers/modelLoader');

async function main() {
  try {
    const classifier = await loadImageClassifier();
    console.log("Image classifier model loaded successfully!");
    const client = new Client({
      intents: intents(),
    });
    eventHandler(client, { classifier });
    client.login(process.env.TOKEN);
  } catch (err) {
    console.error("Error loading the model or starting the bot:", err);
  }
}
main();