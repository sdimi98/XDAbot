const path = require('path');
const getAllFiles = require('../utils/getAllFiles')
module.exports = (client, { classifier, textGenerator }) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        const eventName = eventFolder.split('\\').pop();
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg, classifier, textGenerator);
            }
        })
    }
};