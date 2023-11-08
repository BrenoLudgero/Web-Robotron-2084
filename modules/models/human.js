export {Human};
import {Actor} from "./actor.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.wasRescued = false;
        this.movementType = 2; // 8-way movement
        this.movementSpeed = 4
        // screenX and screenY positions defined in game.addHuman()
    }
}
