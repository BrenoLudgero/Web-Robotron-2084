export {Grunt, Hulk}
import {Enemy} from "./actors.js";
import {RNG, spriteCycle} from "./global_functions.js"

class Hulk extends Enemy {
    constructor(game) {
        super(game);
        this.width = 26;
        this.adjustedWidth = 47;
        this.height = 32;
        this.adjustedHeight = 57;
        this.spritesheetXPosition = 409;
        this.spritesheetYPosition = 434;
        this.playableArea = {
            "x": 968,
            "y": 728
        }
        this.movementSpeed = 0.8; // INCREASES ACCORDING TO WAVE
        this.isHulk = true
    }
    /* 
    UP: spriteCycle(this, 409, 26, 487, 434)
    DOWN: spriteCycle(this, 409, 26, 487, 434)
    LEFT: spriteCycle(this, 409, 26, 487, 398)
    RIGHT: spriteCycle(this, 409, 26, 487, 474)
    */
};

class Grunt extends Enemy {
    constructor(game) {
        super(game);
        this.width = 18;
        this.adjustedWidth = 32;
        this.height = 27;
        this.adjustedHeight = 48;
        this.spritesheetXPosition = 8;
        this.spritesheetYPosition = 285;
        this.playableArea = {
            "x": 982,
            "y": 738
        }
        this.movementSpeed = 7; // INCREASES ACCORDING TO WAVE LENGTH ?
        this.movementTimer = 0;
        this.movementInterval = 100 // DECREASES ACCORDING TO WAVE LENGTH
    };
    update() {
        let randomNumber = RNG(1, 3);
        if (this.movementTimer > this.movementInterval) {
            if (randomNumber === 1) {
                if (this.screenXPosition > this.game.player.screenXPosition) {
                    this.screenXPosition -= this.movementSpeed
                } else {
                    this.screenXPosition += this.movementSpeed
                };
                if (this.screenYPosition > this.game.player.screenYPosition) {
                    this.screenYPosition -= this.movementSpeed
                } else {
                    this.screenYPosition += this.movementSpeed
                };
                spriteCycle(this, 8, 30, 98, 285)
            }
            this.movementTimer = 0
        } else {
            this.movementTimer += this.movementRate
        }
    }
}