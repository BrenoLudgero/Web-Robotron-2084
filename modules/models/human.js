export {Human};
import {Actor} from "../models/actor.js";

class Human extends Actor {
    constructor(game) {
        super(game);
        this.wasRescued = false;
        this.movementType = 2;
        this.movementRate = 4;
        this.movementSpeed = 4.5
        // screenX and screenY positions defined in game.addHuman()
    }
}
