export {Hulk};
import {Enemy} from "../../models/enemy.js";
import {canMove} from "../../helpers/globals.js";

class Hulk extends Enemy {
    constructor(game) {
        super(game, 26, 32);
        this.spritesheetIncrement = 28;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE
        this.movementAnimationDelay = 9;
        this.minHumanSpawnDistance = 90;
        this.hitboxConfig = {
            "left": {
                head: {xPosition: 15, yPosition: 3},
                torso: {xPosition: 9, yPosition: 11},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {width: 14, height: 11, xPosition: 10, yPosition: 34}
            },
            "right": {
                head: {xPosition: 15, yPosition: 2},
                torso: {xPosition: 9, yPosition: 11},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {width: 14, height: 11, xPosition: 15, yPosition: 33}
            },
            "up": {
                head: {width: 9, height: 4, xPosition: 15, yPosition: 0},
                torso: {width: 22, height: 22, xPosition: 9, yPosition: 9},
                rightArm: {width: 9, height: 24, xPosition: 30, yPosition: 9},
                leftArm: {width: 9, height: 24, xPosition: 0, yPosition: 9},
                legs: {width: 15, height: 7, xPosition: 12, yPosition: 31}
            },
            "down": {}
        };
        this.hitboxConfig.down = {...this.hitboxConfig.up};
        this.limbs = this.hitboxConfig.down;
        game.hitboxMngr.setAllHitboxes(this);
    }
    update() {
        if (canMove(this)) {
            this.ai.moveRandomly(this);
            this.animate(this, this.currentDirection);
        }
    }
}
