export {Player};
import {Actor} from "../models/actor.js";

class Player extends Actor {
    constructor(game) {
        super(game, 15, 24);
        this.spritesheetIncrement = 16;
        this.screenX = (game.ui.canvas.width / 2) - this.width;
        this.screenY = (game.ui.canvas.height / 2) - this.height;
        this.lives = 3; // Updated in collisionMngr.checkPlayerCollision
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSpeed = 25;
        this.projectileTimer = 0;
        this.projectileDelay = 7;
        this.hitboxConfig = {
            "left": {
                head: {width: 11, xPosition: 4, yPosition: 2},
                torso: {width: 8, height: 11, xPosition: 6, yPosition: 16},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {width: 6, height: 12, xPosition: 7}
            },
            "right": {
                head: {width: 11, xPosition: 6, yPosition: 2},
                torso: {width: 8, height: 11, xPosition: 7, yPosition: 16},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {width: 6, height: 12, xPosition: 8}
            },
            "up": {
                head: {width: 17, xPosition: 2, yPosition: 1},
                torso: {width: 15, height: 8, xPosition: 3, yPosition: 14},
                rightArm: {width: 3, height: 9, xPosition: 0, yPosition: 17},
                leftArm: {width: 3, height: 9, xPosition: 18, yPosition: 17},
                legs: {width: 9, height: 7, xPosition: 6}
            },
            "down": {
                head: {width: 17, height: 9, xPosition: 2, yPosition: 3},
                torso: {width: 15, height: 8, xPosition: 3, yPosition: 15},
                rightArm: {width: 3, height: 9, xPosition: 0, yPosition: 17},
                leftArm: {width: 3, height: 9, xPosition: 18, yPosition: 17},
                legs: {width: 9, height: 7, xPosition: 6, yPosition: 23}
            }
        };
        this.limbs = this.hitboxConfig.down;
        game.hitboxMngr.setAllHitboxes(this);
    }
    update() {
        this.updateProjectileTimer();
    }
    getProjectileOffsets(direction) {
        const offsets = {
            "up": {x: 9, y: 0},
            "upleft": {x: 16, y: 0},
            "upright": {x: 0, y: 0},
            "down": {x: 9, y: 16},
            "downleft": {x: 16, y: 0},
            "downright": {x: 0, y: 0},
            "left": {x: 9, y: 9},
            "right": {x: 9, y: 9},
        };
        return offsets[direction];
    }
    // Called in inputMngr.processShootingKeys
    shoot(direction) {
        const {projectileMngr, soundMngr} = this.game;
        const {screenX, screenY, projectileSprite, projectileSpeed, projectileDelay} = this;
        const {x: xOffset, y: yOffset} = this.getProjectileOffsets(direction);
        const playerX = screenX + xOffset;
        const playerY = screenY + yOffset;
        if (this.canShoot()) {
            projectileMngr.createProjectile(projectileSprite, playerX, playerY, projectileSpeed, direction);
            this.projectileTimer = projectileDelay;
            const soundPriority = 2;
            const minDuration = 0.1;
            soundMngr.playSound("playerShot", soundPriority, minDuration);
        }
    }
    // Methods below called in inputMngr.processMovementKeys
    moveLeft(inputMngr) {
        if (inputMngr.notPressingD()) {
            this.screenX -= this.movementSpeed;
            this.animate(this, "left");
        }
    }
    moveRight(inputMngr) {
        if (inputMngr.notPressingA()) {
            this.screenX += this.movementSpeed;
            this.animate(this, "right");
        }
    }
    moveUp(inputMngr) {
        this.screenY -= this.movementSpeed;
        if (inputMngr.pressingWOnly() || inputMngr.pressingDnA()) {
            this.animate(this, "up");
        }
    }
    moveDown(inputMngr) {
        this.screenY += this.movementSpeed;
        if (inputMngr.pressingSOnly() || inputMngr.pressingDnA()) {
            this.animate(this, "down");
        }
    }
}
