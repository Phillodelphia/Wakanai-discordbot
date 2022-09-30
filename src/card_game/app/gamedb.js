const fs = require("fs");
const { stringify } = require("querystring");
const { Card } = require("../app/card.js");
const dirPath = "src/card_game/app/cards";

let cardsDB = { "S": [], "A": [], "B": [], "C": [] };
let categoryDB = {};

//Preparing card database for gambling
function prepCard() {
    fs.readdir(dirPath, (err, files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            let data = JSON.parse(fs.readFileSync(dirPath + "/" + file));
            cardsDB[data['RARITY']].push(file);
        });
    });
}

module.exports = { prepCard };