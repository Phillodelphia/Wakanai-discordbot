const { getPlayer } = require("../app/playerdb.js");
const { getRarity } = require("../app/gamedb.js");

function gamble(player) {
    const playerData = getPlayer(player);

    let randomPool = function (obj) {
        const keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };

    let rarity = randomPool(getRarity());
    return rarity[rarity.length * Math.random() << 0];

}

module.exports = { gamble };