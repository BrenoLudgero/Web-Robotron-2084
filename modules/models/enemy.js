export {Enemy};
import {Actor} from "./actor.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.isHulk = false;
        this.movementType = 1; // 4-way movement
        // screenX and screenY positions defined in game.addEnemy()
    }
}
