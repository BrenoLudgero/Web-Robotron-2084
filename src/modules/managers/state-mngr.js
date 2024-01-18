export {StateManager};

class StateManager {
    constructor(game) {
        this.game = game;
        this.score = game.score;
        this.soundMngr = game.soundMngr;
        this.projectileMngr = game.projectileMngr;
        this.actors = game.actorMngr.actors;
        this.player = this.actors.player;
    }
    update() {
        this.handleAllStates();
    }
    actorDestroyed(actor) {
        return actor.currentState === "destroyed";
    }
    handlePlayerDestroyed() {
        if (this.actorDestroyed(this.player)) {
            this.player.lives--;
            this.score.resetRescueBonus();
            const soundPriority = 6;
            this.soundMngr.playSound("playerDestroyed", soundPriority);
            this.projectileMngr.eraseAllProjectiles();
        }
    }
    humanDestroyed(human) {
        if (this.actorDestroyed(human)) {
            const soundPriority = 4;
            const minDuration = 0.36;
            this.soundMngr.playSound("humanDestroyed", soundPriority, minDuration);
        }
    }
    humanWasRecued(human) {
        return human.currentState === "rescued";
    }
    humanRescued(human) {
        if (this.humanWasRecued(human)) {
            this.score.awardRecuePoints(human);
            const soundPriority = 4;
            const minDuration = 0.4;
            this.soundMngr.playSound("humanRescued", soundPriority, minDuration);
        }
    }
    handleHumanStates() {
        for (const human of this.actors.humans) {
            this.humanDestroyed(human);
            this.humanRescued(human);
        }
    }
    enemyDestroyed(enemy) {
        if (this.actorDestroyed(enemy)) {
            this.score.awardEnemyPoints(enemy);
            const soundPriority = 3;
            const minDuration = 0.086;
            this.soundMngr.playSound("enemyDestroyed", soundPriority, minDuration);
        }
    }
    handleEnemyStates() {
        for (const enemy of this.actors.enemies) {
            this.enemyDestroyed(enemy);
        }
    }
    handleAllStates() {
        this.handlePlayerDestroyed();
        this.handleHumanStates();
        this.handleEnemyStates();
    }
}
