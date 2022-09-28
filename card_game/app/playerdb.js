const os = require('os');
const fs = require("fs");
const { json } = require('stream/consumers');
const dataPath = "./data/PlayerDatabase.json";
const template = { "Currency": 100, Wins: 0, Loses: 0, "Cards": [] };

//read the json data from the player database
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
    data[id] += template;
}

return module.exports = { getPlayer, addPlayer };