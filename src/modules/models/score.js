export {Score};

class Score {
    constructor() {
        this.currentScore = 0;
        this.rescueBonus = 0;
        this.nextExtraLife = 25000;
    }
    update(player, soundMngr) {
        this.awardExtraLife(player, soundMngr);
    }
    resetRescueBonus() {
        this.rescueBonus = 0;
    }
    belowBonusLimit() {
        return this.rescueBonus < 4000;
    }
    // Awards human points + bonus up to 5,000 total
    // 1,000 bonus after 2 or more consecutive rescues
    awardRecuePoints(human) {
        this.currentScore += (human.points + this.rescueBonus);
        if (this.belowBonusLimit()) {
            this.rescueBonus += 1000;
        }
    }
    awardEnemyPoints(enemy) {
        this.currentScore += enemy.points;
    }
    extraLifeScoreAchieved() {
        return this.currentScore >= this.nextExtraLife;
    }
    // Awards an extra life when the score is divisible by 25,000
    awardExtraLife(player, soundMngr) {
        if (this.extraLifeScoreAchieved()) {
            player.lives ++;
            this.nextExtraLife += 25000;
            const soundPriority = 5;
            const minDuration = 0.604;
            soundMngr.playSound("extraLife", soundPriority, minDuration);
        }
    }
}
