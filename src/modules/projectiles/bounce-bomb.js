export {BounceBomb};
import {EnemyProjectile} from "../models/enemy-prjctl.js";

class BounceBomb extends EnemyProjectile {
    constructor(sprite, screenX, screenY, speed) {
        super(sprite, screenX, screenY, speed);
        this.width = 21;
        this.height = 21;
        this.timeOnScreen = 180; // Time in updates (3 seconds)
    }
    bounce(game) {
        if (this.touchingCeiling() || this.touchingFloor()) {
            this.reverseYDirection();
            game.soundMngr.playSound("bombBounce");
        }
        else if (this.touchingLeftWall() || this.touchingRightWall()) {
            this.reverseXDirection();
            game.soundMngr.playSound("bombBounce");
        }
    }
    touchingWall() {
        return (
            this.touchingCeiling()
            || this.touchingFloor()
            || this.touchingLeftWall()
            || this.touchingRightWall()
        );
    }
    reverseYDirection() {
        this.directionY *= -1;
    }
    reverseXDirection() {
        this.directionX *= -1;
    }
}
