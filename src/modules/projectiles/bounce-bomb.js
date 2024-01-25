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
        const soundPriority = 2;
        const minDuration = 0.1;
        if (this.touchingCeiling()
            || this.touchingFloor()) {
            this.directionY *= -1;
            game.soundMngr.playSound("bombBounce", soundPriority, minDuration);
        }
        else if (this.touchingLeftWall()
        || this.touchingRightWall()) {
            this.directionX *= -1;
            game.soundMngr.playSound("bombBounce", soundPriority, minDuration);
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
}
