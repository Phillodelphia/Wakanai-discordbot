class Card {
    constructor(name, img, category, rarity, damage, health) {
        this.name = name;
        this.img = img;
        this.category = category;
        this.rarity = rarity;
        this.damage = damage;
        this.health = health;
    }
    //used in the future battle system
    attack(target) {
        target.health -= this.getDamage();
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

return module.exports(Card);