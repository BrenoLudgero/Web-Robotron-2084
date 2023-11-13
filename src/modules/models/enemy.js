export {Enemy};
import {Actor} from "./actor.js";
import {ArtificialIntelligence} from "./artificial-intelligence.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.AI = new ArtificialIntelligence(this.game);
        this.isHulk = false;
        this.movementType = 1; // 4-way movement
        this.minPlayerSpawnDistance = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = this.height;
        this.minEnemySpawnDistance = 80 // CHANGES ACCORDING TO WAVE
        // screenX and screenY positions defined in game.addEnemy()
    }
}
