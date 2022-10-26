const fs = require("fs");
const dataPath = "src/card_game/app/data/";
const template = { "Currency": 100, "Wins": 0, "Loses": 0, "Collection": [] };

//Returns specific player data
function getPlayer(playerId) {
    try {
        let data = fs.readFileSync(dataPath + playerId + ".json");
        return JSON.parse(data);
    }
    catch (err) {
        return null;
    }
    
}
//Add new player to the game
function addPlayer(playerId) {
    let playerData = JSON.stringify(template);
    fs.writeFile(dataPath + playerId + '.json', playerData, { flag: 'w' }, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

module.exports = { getPlayer, addPlayer };
