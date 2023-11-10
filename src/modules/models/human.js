export {Human};
import {Actor} from "./actor.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.wasRescued = false;
        this.movementType = 2; // 8-way movement
        this.movementSpeed = 4;
        this.minPlayerSpawnDistance = 100; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = 150
        // screenX and screenY positions defined in game.addHuman()
    }
}
