export {Enemy};
import {Actor} from "./actor.js";
import {ArtificialIntelligence} from "./ai.js";
import {canAnimate} from "../helpers/globals.js";

class Enemy extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.ai = new ArtificialIntelligence();
        this.points = 0; // Awarded by collisionMngr.checkProjectileCollisions
        this.minPlayerSpawnDistance = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = this.width;
        this.minEnemySpawnDistance = 70; // CHANGES ACCORDING TO WAVE
        // screenX and screenY positions defined in actorMngr.addEnemy
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
            soundMngr.playSound(this.shotSound, soundPriority, minDuration);
        }
    }
}
