const os = require('os');
const fs = require("fs");
const { json } = require('stream/consumers');
const dataPath = "./data/PlayerDatabase.json";

function getData() {
    return json.parse(dataPath)
}
//Returns specific player data
function getPlayer(id) {
    const data = getData();
    return data[id];
}
//Add new player to the game
function addPlayer(id) {
    const data = getData();
    fs.appendFileSync
}