let constructWordCollection = function() {
    // let x = [];

    // for (i = 0; i < words.length; i++) {
    //     if (words[i].length > 3) {
    //         if (words[i] !== words[i + 1] + "s")
    //             x.push(words[i]);
    //         i++;
    //     }

    // }
    // fs.writeFile("dictionary.json", JSON.stringify(x), function(err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // });
    let x = [];
    for (value in words[0]) {
        if (value.length < 8) {
            x.push({
                term: value,
                definition: words[0][value]
            });
        }
    }
    fs.writeFile("computerTermsDictionary.json", JSON.stringify(x), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
module.exports = constructWordCollection;