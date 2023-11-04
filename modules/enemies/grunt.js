export {Grunt};
import {Enemy} from "../models/enemy.js";
import {RNG, cycleSprite} from "../global_functions.js";

class Grunt extends Enemy {
    constructor(game) {
        super(game);
        this.width = 18;
        this.adjustedWidth = 32;
        this.height = 27;
        this.adjustedHeight = 48;
        this.spritesheetXPosition = 8;
        this.spritesheetYPosition = 285;
        this.movementSpeed = 7; // INCREASES ACCORDING TO WAVE LENGTH ?
        this.movementTimer = 0;
        this.movementInterval = 30 // DECREASES ACCORDING TO WAVE LENGTH
    };
    update() {
        if (this.movementTimer > this.movementInterval) {
            this.moveAtRandomIntervals();
            this.movementTimer = 0
        } else {
            this.movementTimer += this.movementRate
        }
    };
    chasePlayer() {
        if (this.screenXPosition > this.game.player.screenXPosition) {
            this.screenXPosition -= this.movementSpeed
        } else {
            this.screenXPosition += this.movementSpeed
        };
        if (this.screenYPosition > this.game.player.screenYPosition) {
            this.screenYPosition -= this.movementSpeed
        } else {
            this.screenYPosition += this.movementSpeed
        }
    };
    moveAtRandomIntervals() {
        let randomNumber = RNG(1, 3);
        if (randomNumber === 1) {
            this.chasePlayer();
            cycleSprite(this, 8, 30, 98, 285)
        }
    }
}
