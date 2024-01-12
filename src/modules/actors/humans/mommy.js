export {Mommy};
import {Human} from "../../models/human.js";

class Mommy extends Human {
    constructor(game, spritesIndex) {
        super(game, 14, 28);
        this.sprites.src = spritesIndex.mommy;
    }
}
