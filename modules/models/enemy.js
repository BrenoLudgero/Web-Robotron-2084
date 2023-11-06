export {Enemy};
import {Actor} from "../models/actor.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.isHulk = false;
        this.movementType = 1;
        this.movementTimer;
        this.movementInterval;
        this.movementRate = 5  //  DO  NOT  CHANGE !
        // screenX and screenY positions defined in game.addEnemy()
    }
}
