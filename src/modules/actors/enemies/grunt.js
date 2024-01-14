export {Grunt};
import {Enemy} from "../../models/enemy.js";
import {setHitbox} from "../../helpers/globals.js";

class Grunt extends Enemy {
    constructor(game, spritesIndex) {
        super(game, 18, 27);
        this.points = 100;
        this.sprites.src = spritesIndex.grunt;
        this.spritesheetIncrement = 20;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE ELAPSED TIME (TAKING TOO LONG)
        this.movementTimer = 0;
        this.movementInterval = 10; // DECREASES ACCORDING TO WAVE ELAPSED TIME
        setHitbox(this, 2, 6, 0, 3);
    }
    update(game) {
        this.move(game);
    }
    canMove() {
        return this.movementTimer > this.movementInterval;
    }
    move(game) {
        if (this.canMove()) {
            this.ai.moveAtRandomIntervals(this, game);
            this.stayWithinCanvas();
            this.movementTimer = 0;
        } else {
            this.movementTimer++;
        }
    }
}
