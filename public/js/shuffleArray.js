let generateRandomNumber = require('./generateRandomNumber');
let shuffleArray = function(arr) {
    let index = generateRandomNumber(arr.length);
    let indices = [index];
    while (indices.length != arr.length) {
        index = generateRandomNumber(arr.length);
        if (!(indices.includes(index))) {
            indices.push(index);
        }
    }
    let shuffledTerm = [];
    for (let i = 0; i < indices.length; i++) {
        shuffledTerm.push(arr[indices[i]]);
    }
    return shuffledTerm;
}
module.exports = shuffleArray;