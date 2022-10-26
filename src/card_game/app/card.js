//Card metadata used when trading and collecting
class Card {
    constructor(name, category, abbreviation, rarity, damage, health) {
        this.name = name;
        this.category = category;
        this.abbreviation = abbreviation;
        this.rarity = rarity;
        this.damage = damage;
        this.health = health;
        //This bit of code is veeeeeery capitilize heavy might change it in the future if it starts becoming a hassle
        this.img = "./src/card_game/app/assets/cards_img/" + abbreviation + "_" + name + ".png";
    }
    getName() {
        return this.name;
    }
    getImg() {
        return this.img;
    }
    getCategory() {
        return this.category;
    }
    getRarity() {
        return this.rarity;
    }
    getDamage() {
        return this.damage;
    }
}

module.exports.Card = Card;