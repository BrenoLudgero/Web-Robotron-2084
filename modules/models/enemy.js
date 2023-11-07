export {Enemy};
import {Actor} from "./actor.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.isHulk = false;
        this.movementType = 1; // 4-way movement
        this.movementRate = 5 //  DO  NOT  CHANGE !
        // screenX and screenY positions defined in game.addEnemy()
    }
}
