export {Enemy};
import {Actor} from "./actor.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.isHulk = false;
        this.movementType = 1; // 4-way movement
        this.minPlayerSpawnDistance = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = this.height;
        this.minEnemySpawnDistance = 35
        // screenX and screenY positions defined in game.addEnemy()
    }
}
