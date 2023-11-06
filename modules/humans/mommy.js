export {Mommy};
import {Human} from "../models/human.js";
import {cycleSprite} from "../global_functions.js";

class Mommy extends Human {
    constructor(game) {
        super(game, 14, 28);
        this.game = game;
        this.sprites.src = "../../../images/humans/mommy.png";
        this.movementAnimationDelay = 6
    };
    update() {
        if (this.game.currentFrame % this.movementAnimationDelay == 0) {
            this.moveRandomly();
            this.animate()
        }
    };
    animate() {
        switch(this.currentDirection) {
            case("left"):
            case("upleft"):
            case("downleft"):
                cycleSprite(this, 16, 59); break
            case("right"):
            case("upright"):
            case("downright"):
                cycleSprite(this, 16, 88); break
            case("up"):
                cycleSprite(this, 16, 30); break
            case("down"):
                cycleSprite(this, 16, 0); break
        }
    }
}
