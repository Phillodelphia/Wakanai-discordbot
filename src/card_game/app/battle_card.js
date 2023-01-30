//For the future battle system
class battle_card {
    construct(name, img, hp, dmg) {
    //blah blah attribute assignment you get the point
    this.name = name;
    this.img = img;
    this.hp = hp;
    this.dmg = dmg;
    }
    //used in the future battle system
    attack(target) {
        target.takeDamage(this.getDamage());
    }
    getDamage() {
        return this.dmg;
    }
    getHealth() {
        return this.hp;
    }
    takeDamage(damage) {
        this.hp -= damage;
    }
}