const fs = require("fs");
let dataPath = "src/card_game/app/data/";
let template = { "Currency": 100, "Wins": 0, "Loses": 0, "Collection": [] };

//Returns specific player data
function getPlayer(playerId) {
    let data = fs.readFileSync(dataPath + playerId + ".json");
    return JSON.parse(data);
}
//Add new player to the game
function addPlayer(playerId) {
    let playerData = JSON.stringify(template);
    fs.writeFile(dataPath + playerId + '.json', playerData, { flag: 'w' }, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

return module.exports = { getPlayer, addPlayer };