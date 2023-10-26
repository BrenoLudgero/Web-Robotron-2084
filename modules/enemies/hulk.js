export {Hulk};
import {Enemy} from "../models/enemy.js";
import {spriteCycle, setMovementBoundaries, turnAwayFromWall, walkRandomly} from "../global_functions.js";

class Hulk extends Enemy {
    constructor(game) {
        super(game);
        this.width = 26;
        this.adjustedWidth = 47;
        this.height = 32;
        this.adjustedHeight = 57;
        this.spritesheetXPosition = 409;
        this.spritesheetYPosition = 434;
        this.movementAnimationDelay = 7;
        this.playableArea = {
            "x": 963,
            "y": 728
        }
        this.movementSpeed = 5; // INCREASES ACCORDING TO WAVE
        this.isHulk = true
    };
    update() {
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
        if (this.game.currentFrame % this.movementAnimationDelay == 0) {
            turnAwayFromWall(this);
            walkRandomly(this);
            switch(this.currentDirection) {
                case("left"):
                    spriteCycle(this, 409, 26, 487, 398)
                    break
                case("right"):
                    spriteCycle(this, 409, 26, 487, 474)
                    break;
                case("up"):
                    spriteCycle(this, 409, 26, 487, 434)
                    break
                case("down"):
                    spriteCycle(this, 409, 26, 487, 434)
                    break
            }
        }
    }
}
