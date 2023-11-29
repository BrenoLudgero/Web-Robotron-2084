export {Enemy};
import {Actor} from "./actor.js";
import {ArtificialIntelligence} from "../managers/ai-mngr.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.ai = new ArtificialIntelligence(this.game);
        this.isHulk = false; // Used in collisionMngr.checkProjectileCollisions
        this.points = 0; // Awarded by collisionMngr.checkProjectileCollisions
        this.movementType = 1; // 4 directions
        this.minPlayerSpawnDistance = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = this.height;
        this.minEnemySpawnDistance = 80; // CHANGES ACCORDING TO WAVE
        // screenX and screenY positions defined in actorMngr.addEnemy()
    }
}
