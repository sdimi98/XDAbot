let MarkovClass = require('markov-strings').default;
module.exports = function (messages) {

    const markov = new MarkovClass({ stateSize: 2 });

    markov.addData(messages);
    const options = {
        maxTries: 30
    };

    let result = markov.generate(options);
    let maxtries = 0;
    while (result.string.split(" ").length < 3 && maxtries < 50){
        result = markov.generate(options);
    }
    return result.string;

}