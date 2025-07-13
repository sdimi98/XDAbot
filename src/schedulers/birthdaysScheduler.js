const schedule = require('node-schedule');
const { getTodayBirthdaysFromDb } = require('../services/birthdaysService')
const tryGetMainTextChannel = require('../utils/helpers/tryGetMainTextChannel');
const runModel = require('../utils/python/pythonBridge');

const createBirthdayPrompt = (name) => `
Compose a majestic and eloquent birthday wish (in English)
for a person named ${name} as if you were a Qing Dynasty Confucian scholar delivering a formal tribute.
Let it be rich with ancient wisdom, poetic metaphors, and blessings for longevity, prosperity, and inner harmony.
Use refined, scholarly language and the dignified tone of a court philosopher.
`;

module.exports = (client) => {
  console.log("Birthday scheduler initiated.")


  schedule.scheduleJob('0 24 04 * * *', async function () {
    const birthdaysToday = getTodayBirthdaysFromDb()
    for (const birthday of birthdaysToday) {
      const guild = await client.guilds.fetch(birthday.guild_id);
      const channel = tryGetMainTextChannel(guild);
      const prompt = createBirthdayPrompt(birthday.name);
      const message = await runModel(prompt, 'messageReply.py');
      channel.send(`<@${birthday.user_id}> ${message}` )
    }

  })
}