let MarkovClass = require('markov-strings').default;
module.exports = function (messages) {

    const markov = new MarkovClass({ stateSize: 1 });

    markov.addData(messages);
    const options = {
        maxLength: 100,
        minWords: 5
    };

    const result = markov.generate(options);
    return result.string;

}