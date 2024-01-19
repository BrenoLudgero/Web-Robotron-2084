export {Enemy};
import {Actor} from "./actor.js";
import {ArtificialIntelligence} from "./ai.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.ai = new ArtificialIntelligence();
        this.points = 0; // Awarded by collisionMngr.checkProjectileCollisions
        this.minPlayerSpawnDistance = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = this.width;
        this.minEnemySpawnDistance = 70; // CHANGES ACCORDING TO WAVE
        // screenX and screenY positions defined in actorMngr.addEnemy
    }
}
