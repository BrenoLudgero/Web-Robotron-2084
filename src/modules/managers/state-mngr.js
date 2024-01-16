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
            this.soundMngr.playSound("playerDestroyed", 6);
            this.projectileMngr.eraseAllProjectiles();
        }
    }
    humanDestroyed(human) {
        if (this.actorDestroyed(human)) {
            this.soundMngr.playSound("humanDestroyed", 4, 0.36);
        }
    }
    humanWasRecued(human) {
        return human.currentState === "rescued";
    }
    humanRescued(human) {
        if (this.humanWasRecued(human)) {
            this.score.awardRecuePoints(human);
            this.soundMngr.playSound("humanRescued", 4, 0.4);
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
            this.soundMngr.playSound("enemyDestroyed", 3, 0.086);
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
