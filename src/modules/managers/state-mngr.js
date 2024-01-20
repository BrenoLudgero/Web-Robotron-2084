export {StateManager};
import {isActorOfType} from "../helpers/globals.js";

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
    handleHumanDestroyed(human) {
        if (this.actorDestroyed(human)) {
            this.actors.humans.delete(human);
            const soundPriority = 4;
            const minDuration = 0.36;
            this.soundMngr.playSound("humanDestroyed", soundPriority, minDuration);
        }
    }
    humanWasRecued(human) {
        return human.currentState === "rescued";
    }
    handleHumanRescued(human) {
        if (this.humanWasRecued(human)) {
            this.score.awardRecuePoints(human);
            this.actors.humans.delete(human);
            const soundPriority = 4;
            const minDuration = 0.4;
            this.soundMngr.playSound("humanRescued", soundPriority, minDuration);
        }
    }
    handleHumanStates() {
        for (const human of this.actors.humans) {
            this.handleHumanDestroyed(human);
            this.handleHumanRescued(human);
        }
    }
    handleEnemyDestroyed(enemy) {
        if (this.actorDestroyed(enemy)) {
            this.score.awardEnemyPoints(enemy);
            this.actors.enemies.delete(enemy);
            const soundPriority = 3;
            const minDuration = 0.086;
            this.soundMngr.playSound("enemyDestroyed", soundPriority, minDuration);
        }
    }
    handleEnemyStates() {
        for (const enemy of this.actors.enemies) {
            this.handleEnemyDestroyed(enemy);
        }
    }
    handleAllStates() {
        this.handlePlayerDestroyed();
        this.handleHumanStates();
        this.handleEnemyStates();
    }
}
