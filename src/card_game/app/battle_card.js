//For the future battle system
class battle_card {
    construct(name, img, hp, dmg) {
    //blah blah attribute assignment you get the point
    }
    //used in the future battle system
    attack(target) {
        target.health -= this.getDamage();
    }
}