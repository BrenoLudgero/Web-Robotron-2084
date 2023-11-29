export {Mommy};
import {Human} from "../../models/human.js";

class Mommy extends Human {
    constructor(game) {
        super(game, 14, 28);
        this.sprites.src = game.spritesIndex.mommy;
        this.movementAnimationDelay = 9;
    }
}
