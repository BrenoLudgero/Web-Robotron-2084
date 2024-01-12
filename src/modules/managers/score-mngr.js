export {ScoreManager};

class ScoreManager {
    constructor() {
        this.score = 0;
        this.rescueBonus = 0;
        this.nextExtraLife = 25000;
    }
    update(game) {
        const {actorMngr, soundMngr} = game;
        this.awardExtraLife(actorMngr.player, soundMngr);
    }
    // Methods below used in collisionMngr
    resetRescueBonus() {
        this.rescueBonus = 0;
    }
    // Awards human points + bonus up to 5,000 total
    // 1,000 bonus after 2 or more consecutive rescues
    awardRecuePoints(human) {
        this.score += (human.points + this.rescueBonus);
        if (this.rescueBonus < 4000) {
            this.rescueBonus += 1000;
        }
    }
    awardEnemyPoints(enemy) {
        this.score += enemy.points;
    }
    shouldAwardLife() {
        return this.score >= this.nextExtraLife;
    }
    // Awards an extra life when the score is divisible by 25,000
    awardExtraLife(player, soundMngr) {
        if (this.shouldAwardLife()) {
            player.lives += 1;
            this.nextExtraLife += 25000;
            soundMngr.playSound("extraLife", 5, 0.604);
        }
    }
}
