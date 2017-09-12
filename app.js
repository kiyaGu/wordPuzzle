const fetch = require('isomorphic-fetch');
const express = require('express');
const exphbs = require('express-handlebars');
const formidable = require('express-formidable');
const wordList = require('word-list-json');
const path = require('path');
const randomWord = require('random-word');
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(formidable());
app.get('/', (req, res) => {
    // console.log();
    //90def950
    //Application Keys	b5ca8fbf669856c3833ffe9047f28134
    let x = randomWord();
    console.log(x)
    let url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + x + "/definitions";
    fetch(url, {
            method: 'GET',
            headers: {
                app_id: "90def950",
                app_key: "b5ca8fbf669856c3833ffe9047f28134"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0])
        })
        .catch((err) => {
            console.log(err)
        })
    res.render('index')
})

app.listen(3000, () => {
    console.log("The server is listening at 3000");
})