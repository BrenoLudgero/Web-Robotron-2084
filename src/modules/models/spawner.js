export {Spawner};
import {Enemy} from "./enemy.js";
import {canAnimate} from "../helpers/globals.js";

class Spawner extends Enemy {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000;
        this.animationDelay = 5;
        this.lastSprite = 5; // Sprite animation stops on this sprite before restarting
        this.secondsBeforeSpawningStarts = 4; // CHANGES ACCORDING TO WAVE
        this.secondsBetweenSpawns = 1.5; // Initial time between animation change and first spawn
        this.currentSprite = 1;
        setTimeout(() => {
            this.updateState("spawning");
        }, this.secondsBeforeSpawningStarts * 1000);
    }
    animate() {
        if (canAnimate(this)) {
            this.game.spriteMngr.nextSpawnerSprite(this);
            this.game.hitboxMngr.updateSpawnerHitbox(this);
        }
    }
    spawnEnemies() {
        const {actorMngr, soundMngr} = this.game;
        if (this.spawnAmount <= 0) {
            this.updateState("vanished");
            return;
        }
        if (this.secondsBetweenSpawns <= 0) {
            actorMngr.addSpawnerEnemy(this, 1, this.enemyToSpawn);
            const soundPriority = 4;
            const minDuration = 0.3;
            soundMngr.playSound(this.spawnSound, soundPriority, minDuration)
            this.spawnAmount--;
            this.secondsBetweenSpawns = 3; // Time untill the next spawn
        } else {
            this.secondsBetweenSpawns -= 1 / 60;
        }
    }
}
