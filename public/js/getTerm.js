const words = require('../../computerTermsDictionary.json');
const shuffleArray = require('./shuffleArray');
let generateRandomNumber = require('./generateRandomNumber');
let alradyPlayed = [];
let getTerm = function() {
    let index = generateRandomNumber(words.length - 1);
    while (alradyPlayed.includes(index)) {
        index = generateRandomNumber(words.length - 1);
    }
    alradyPlayed.push(index);

    let splitedTerm = words[index].term.split("");
    previousTerm = words[index].term;
    let shuffledSplitedTerm = shuffleArray(splitedTerm);
    return {
        played: alradyPlayed.length,
        term: words[index].term,
        shuffledTerm: shuffledSplitedTerm,
        definition: words[index].definition
    }
}
module.exports = getTerm;