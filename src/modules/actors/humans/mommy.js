export {Mommy};
import {Human} from "../../models/human.js";
import {ArtificialIntelligence} from "../../models/artificial-intelligence.js";

class Mommy extends Human {
    constructor(game) {
        super(game, 14, 28);
        this.AI = new ArtificialIntelligence;
        this.sprites.src = game.spritesIndex.mommy;
        this.movementAnimationDelay = 9
    };
}
