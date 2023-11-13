export {Mommy};
import {Human} from "../../models/human.js";
import {ArtificialIntelligence} from "../../managers/ai-mngr.js";

class Mommy extends Human {
    constructor(game) {
        super(game, 14, 28);
        this.ai = new ArtificialIntelligence;
        this.sprites.src = game.spritesIndex.mommy;
        this.movementAnimationDelay = 9
    }
}
