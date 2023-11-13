export {Grunt};
import {Enemy} from "../../models/enemy.js";

class Grunt extends Enemy {
    constructor(game) {
        super(game, 18, 27);
        this.points = 100;
        this.sprites.src = game.spritesIndex.grunt;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE ELAPSED TIME (LATER)
        this.movementTimer = 0;
        this.movementInterval = 20 // DECREASES ACCORDING TO WAVE ELAPSED TIME
    };
    update() {
        this.ai.moveAwayFromWall(this);
        if (this.movementTimer > this.movementInterval) {
            this.ai.moveAtRandomIntervals(this);
            this.movementTimer = 0
        } else {
            this.movementTimer++
        }
    }
}
