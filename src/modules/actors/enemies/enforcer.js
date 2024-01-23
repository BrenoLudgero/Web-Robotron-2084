export {Enforcer};
import {Enemy} from "../../models/enemy.js";
import {RNG, canAnimate} from "../../helpers/globals.js";

class Enforcer extends Enemy {
    constructor(game) {
        super(game, 18, 22);
        this.initialized = false;
        this.points = 150;
        // this.minMoveSpeed = 1; // CHANGES ACCORDING TO WAVE
        // this.maxMoveSpeed = 2; // CHANGES ACCORDING TO WAVE
        this.movementSpeed = 1 // RNG(this.minMoveSpeed, this.maxMoveSpeed);
        this.minDistanceFromPlayer = RNG(500, 1000);
        this.currentSprite = 1;
        this.lastSprite = 6; // Full size
        this.animationDelay = 5;
        this.projectileSpeed = RNG(4, 6);
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
        if (!this.isFullSize()) {
            this.fadeIn();
            return;
        }
        this.ai.moveInRelationToPlayer(this, this.game, true); // Follows Player
        this.updateProjectileTimer();
        this.shoot();
    }
    isFullSize() {
        return this.currentSprite === this.lastSprite;
    }
    fadeIn() {
        if (canAnimate(this)) {
            this.game.spriteMngr.nextSprite(this);
            this.currentSprite++;
        }
    }
    shoot() {
        const {projectileMngr, soundMngr} = this.game;
        const {projectileSpeed, projectileDelay} = this;
        const projectileX = this.screenX + (this.width / 2);
        const projectileY = this.screenY + (this.height / 2);
        if (this.canShoot()) {
            projectileMngr.createProjectile(this, projectileX, projectileY, projectileSpeed);
            this.projectileTimer = projectileDelay;
            const soundPriority = 3;
            const minDuration = 0.2;
            soundMngr.playSound("sparkShot", soundPriority, minDuration);
        }
    }
}
