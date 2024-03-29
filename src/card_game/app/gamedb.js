const fs = require("fs");
const { Card } = require("../app/card.js");
const dirPath = "src/card_game/app/cards";

let rarityDB = { "S": [], "A": [] };
//, "B": [], "C": []
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
            let card = new Card(data['NAME'], data['CATEGORY'], data['ABBREVIATION'], data['RARITY'], data['DAMAGE'], data['HEALTH']);
            //If new category is detected, add a new section
            if (!categoryDB[card.category]) {
                categoryDB[card.category] = [];
            }
            categoryDB[card.category].push(card);
            rarityDB[data['RARITY']].push(card);
        });
    });
}

//Get a specific category if no title is provided give all categories you can choose from
function getCategory(title) {
    const returnList = [];
    title = title
        .join('_')
        .toLowerCase();
    if (title && title in categoryDB) {
        categoryDB[title].forEach((card) =>  {
            returnList.push(card);
        });
    }
    else {
        //temporary change, make sure to change this logic
        return null;
        for (const [ key ] of Object.entries(categoryDB)) {
            returnList.push(key);
        }
    }
    return returnList;
}

function getRarity() {
    return rarityDB;
}

module.exports = { prepCard, getCategory, getRarity };