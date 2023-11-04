export {Mommy};
import {Human} from "../models/human.js";
import {cycleSprite} from "../global_functions.js";

class Mommy extends Human {
    constructor(game) {
        super(game);
        this.game = game;
        this.width = 14;
        this.adjustedWidth = 25;
        this.height = 28;
        this.adjustedHeight = 50;
        this.spritesheetXPosition = 114;
        this.spritesheetYPosition = 369;
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
                cycleSprite(this, 114, 26, 192, 443); break
            case("right"):
            case("upright"):
            case("downright"):
                cycleSprite(this, 114, 26, 192, 476); break
            case("up"):
                cycleSprite(this, 114, 26, 192, 408); break
            case("down"):
                cycleSprite(this, 114, 26, 192, 369); break
        }
    }
}
