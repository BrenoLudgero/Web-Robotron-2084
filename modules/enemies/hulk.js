export {Hulk};
import {Enemy} from "../models/enemy.js";
import {cycleSprite} from "../global_functions.js";

class Hulk extends Enemy {
    constructor(game) {
        super(game);
        this.width = 26;
        this.adjustedWidth = 47;
        this.height = 32;
        this.adjustedHeight = 57;
        this.spritesheetXPosition = 409;
        this.spritesheetYPosition = 434;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE
        this.movementAnimationDelay = 5;
        this.isHulk = true;
        this.knockbackForce = 6
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
                cycleSprite(this, 409, 26, 487, 398); break
            case("right"):
                cycleSprite(this, 409, 26, 487, 474); break
            case("up"):
                cycleSprite(this, 409, 26, 487, 434); break
            case("down"):
                cycleSprite(this, 409, 26, 487, 434); break
        }
    }
}
