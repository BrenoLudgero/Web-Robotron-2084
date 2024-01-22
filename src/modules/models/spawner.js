export {Spawner};
import {Enemy} from "./enemy.js";
import {RNG, canAnimate} from "../helpers/globals.js";

class Spawner extends Enemy {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000;
        this.minPlayerSpawnDistance = 450;
        this.minMoveSpeed = 1; // CHANGES ACCORDING TO WAVE
        this.maxMoveSpeed = 2; // CHANGES ACCORDING TO WAVE
        this.movementSpeed = RNG(this.minMoveSpeed, this.maxMoveSpeed);
        this.currentSprite = RNG(1, 4);
        this.animationDelay = 3;
        this.lastSprite = 5; // Sprite animation stops on this sprite before restarting
        this.secondsBeforeSpawningStarts = 4; // CHANGES ACCORDING TO WAVE
        this.secondsBetweenSpawns = RNG(1, 4); // Initial time between animation change and first spawn
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
            this.secondsBetweenSpawns = RNG(1, 3); // Time untill the next spawn
        } else {
            this.secondsBetweenSpawns -= 1 / 60;
        }
    }
    fadeOut() {
        this.hitboxes.itself.xPosition = this.hidden;
        this.hitboxes.itself.yPosition = this.hidden;
        this.animationDelay = 6;
    }
}
