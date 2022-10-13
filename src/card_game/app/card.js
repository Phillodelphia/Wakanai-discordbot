//Card metadata used when trading and collecting
class Card {
    constructor(name, category, rarity, damage, health) {
        this.name = name;
        this.img = "../assets/cards_img/" + name + ".png";
        this.category = category;
        this.rarity = rarity;
        this.damage = damage;
        this.health = health;
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