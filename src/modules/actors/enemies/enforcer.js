export {Enforcer};
import {Enemy} from "../../models/enemy.js";
import {RNG, canAnimate} from "../../helpers/globals.js";

class Enforcer extends Enemy {
    constructor(game) {
        super(game, 18, 22);
        this.initialized = false;
        this.points = 150;
        this.minMoveSpeed = 1; // CHANGES ACCORDING TO WAVE
        this.maxMoveSpeed = 3; // CHANGES ACCORDING TO WAVE
        this.movementSpeed = RNG(this.minMoveSpeed, this.maxMoveSpeed);
        this.minDistanceFromPlayer = RNG(300, 600);
        this.currentSprite = 1;
        this.animationDelay = 6;
        this.projectileSpeed = 2;
        this.projectileTimer = RNG(5, 20);
        this.projectileDelay = RNG(100, 300);
        this.hitboxes = {
            head: {width: 10, height: 7, xPosition: 8, yPosition: 4},
            torso: {width: 19, height: 12, xPosition: 4, yPosition: 12},
            rightArm: {width: 3, height: 8, xPosition: 0, yPosition: 15},
            leftArm: {width: 3, height: 8, xPosition: 24, yPosition: 15},
            legs: {width: 15, height: 6, xPosition: 6, yPosition: 26}
        };
    }
    update() {
        if (!this.initialized) {
            this.initialize();
            return;
        }
        this.ai.moveInRelationToPlayer(this, this.game, true); // Follows Player
        this.stayWithinCanvas();
    }
    fadeIn() {
        if (this.currentSprite !== 6) {
            this.game.spriteMngr.nextSprite(this);
            this.currentSprite++;
        }
        else {
            this.initialized = true;
        }
    }
    initialize() {
        if (canAnimate(this)) {
            this.fadeIn();
        }
    }
}
