const fetch = require('isomorphic-fetch');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    let url = "http://api.pearson.com/v2/dictionaries/entries?headword=love";
    fetch(url, {
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.results[4].senses[0].definition)
        })
    res.render('index.html')
})
app.listen(3000, () => {
    console.log("The server is listening at 3000");
})