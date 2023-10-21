export {Mommy}
import {Human} from "./actors.js";
import {spriteCycle, setMovementBoundaries, turnAwayFromWall, walkRandomly} from "./global_functions.js"

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
        this.movementAnimationDelay = 7;
        this.playableArea = {
            "x": 990,
            "y": 738
        }
    };
    update () {
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
        if (this.game.currentFrame % this.movementAnimationDelay == 0) {
            turnAwayFromWall(this);
            walkRandomly(this);
            switch(this.currentDirection) {
                case("left"):
                case("upleft"):
                case("downleft"):
                    spriteCycle(this, 114, 26, 192, 443)
                    break
                case("right"):
                case("upright"):
                case("downright"):
                    spriteCycle(this, 114, 26, 192, 476)
                    break;
                case("up"):
                    spriteCycle(this, 114, 26, 192, 408)
                    break
                case("down"):
                    spriteCycle(this, 114, 26, 192, 369)
                    break
            }
        }
    }
}
