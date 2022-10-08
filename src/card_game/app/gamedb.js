const fs = require("fs");
const { Card } = require("../app/card.js");
const dirPath = "src/card_game/app/cards";

let rarityDB = { "S": [], "A": [], "B": [], "C": [] };
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
            let card = new Card(data['NAME'], data['CATEGORY'], data['RARITY'], data['DAMAGE'], data['HEALTH']);
            categoryDB[card.category].push(card);
            rarityDB[data['RARITY']].push(card);
        });
    });
}

function getCategory(title) {
    const cardList = [];
    if (title != undefined) {
        categoryDB[title].forEach((card) =>  {
            cardList.push(card);
        });
    }
    return cardList;
}

module.exports = { prepCard, getCategory };