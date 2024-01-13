export {Grunt};
import {Enemy} from "../../models/enemy.js";
import {setHitbox} from "../../helpers/globals.js";

class Grunt extends Enemy {
    constructor(game, spritesIndex) {
        super(game, 18, 27);
        this.points = 100;
        this.sprites.src = spritesIndex.grunt;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE ELAPSED TIME (TAKING TOO LONG)
        this.movementTimer = 0;
        this.movementInterval = 10; // DECREASES ACCORDING TO WAVE ELAPSED TIME
        setHitbox(this, 2, 5, 0, 2);
    }
    update(game) {
        const {ai, movementInterval} = this;
        this.move(movementInterval, ai, game);
    }
    canMove(movementInterval) {
        return this.movementTimer > movementInterval;
    }
    move(movementInterval, ai, game) {
        if (this.canMove(movementInterval)) {
            ai.moveAtRandomIntervals(this, game);
            this.stayWithinCanvas();
            this.movementTimer = 0;
        } else {
            this.movementTimer++;
        }
    }
}
