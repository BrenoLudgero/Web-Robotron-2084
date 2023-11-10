export {Grunt};
import {Enemy} from "../../models/enemy.js";
import * as globals from "../../helpers/globals.js";

class Grunt extends Enemy {
    constructor(game) {
        super(game, 18, 27);
        this.sprites.src = game.spritesIndex.grunt;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE ELAPSED TIME (LATER)
        this.movementTimer = 0;
        this.movementInterval = 20 // DECREASES ACCORDING TO WAVE ELAPSED TIME
    };
    update() {
        if (this.movementTimer > this.movementInterval) {
            this.moveAtRandomIntervals();
            this.movementTimer = 0
        } else {
            this.movementTimer++
        }
    };
    chasePlayer() {
        const {player} = this.game;
        if (this.screenX > player.screenX) {
            this.screenX -= this.movementSpeed
        } else {
            this.screenX += this.movementSpeed
        };
        if (this.screenY > player.screenY) {
            this.screenY -= this.movementSpeed
        } else {
            this.screenY += this.movementSpeed
        }
    };
    moveAtRandomIntervals() {
        let randomNumber = globals.RNG(1, 3);
        if (randomNumber === 1) {
            this.chasePlayer();
            globals.cycleSprite(this, 20, 0)
        }
    }
}
