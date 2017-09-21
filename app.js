const fetch = require('isomorphic-fetch');
const express = require('express');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const wordList = require('word-list-json');
const path = require('path');
// const words = require('./computerTermsDictionary.json');
// const words = require('./computerWords.json');
const fs = require('fs');
// const shuffleArray = require('./public/js/shuffleArray');
const getTerm = require('./public/js/getTerm');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(formidable());
global.previousTerm;
app.get('/', (req, res) => {
    let givenTermAndDefinition = getTerm();
    res.render('index', givenTermAndDefinition);
})
app.post('/wordPuzzle', (req, res) => {
    if (req.fields.answer === previousTerm) {
        let givenTermAndDefinition = getTerm();
        givenTermAndDefinition["verdict"] = "W";
        //W - win
        res.send(givenTermAndDefinition);
    } else {
        let temp = previousTerm;
        let givenTermAndDefinition = getTerm();
        givenTermAndDefinition["previousTerm"] = temp;
        givenTermAndDefinition["verdict"] = "L";
        //L - lose
        res.send(givenTermAndDefinition);
    }
})
app.get('/tryAnotherOne', (req, res) => {
    let givenTermAndDefinition = getTerm();
    res.send(givenTermAndDefinition);
})
app.listen(3000, () => {
    console.log("The server is listening at 3000");
})