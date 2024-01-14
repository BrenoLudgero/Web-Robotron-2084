export {Player};
import {Actor} from "../models/actor.js";
import {setHitbox, cycleSprite} from "../helpers/globals.js";

class Player extends Actor {
    constructor(game, spritesIndex) {
        super(game, 15, 24);
        this.sprites.src = spritesIndex.player;
        this.spritesheetIncrement = 16;
        this.screenX = (game.ui.canvas.width / 2) - this.width;
        this.screenY = (game.ui.canvas.height / 2) - this.height;
        this.lives = 3; // Updated in collisionMngr.checkPlayerCollision
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSprite = spritesIndex.playerProjectile;
        this.projectileSpeed = 25;
        this.projectileTimer = 0;
        this.projectileDelay = 7;
        setHitbox(this, 8, 8, 1, 1);
    }
    update() {
        this.updateProjectileTimer();
    }
    // Called in inputMngr.processShootingKeys
    shoot(left, right, up, down, yOffset) {
        const {screenX, screenY} = this;
        const {projectileMngr, soundMngr} = this.game;
        const {projectileSprite, projectileSpeed, projectileDelay} = this;
        const xOffset = 9;
        const playerX = screenX + xOffset;
        const playerY = screenY + yOffset;
        if (this.projectileTimer <= 0) {
            projectileMngr.createProjectile(projectileSprite, playerX, playerY, projectileSpeed, left, right, up, down);
            this.projectileTimer = projectileDelay;
            soundMngr.playSound("playerShot", 2, 0.1);
        }
    }
    animate(direction) { 
        switch(direction) {
            case("left"):
                cycleSprite(this, 51); 
                setHitbox(this, 10, 4, 1, 0); break;
            case("right"):
                cycleSprite(this, 75); 
                setHitbox(this, 10, 4, 1, 0); break;
            case("up"):
                cycleSprite(this, 26); 
                setHitbox(this, 8, 8, 1, 3); break;
            case("down"):
                cycleSprite(this, 0); 
                setHitbox(this, 8, 8, 1, 1); break;
        }
    }
    // Methods below called in inputMngr.processMovementKeys
    moveLeft(inputMngr) {
        if (inputMngr.notPressingD()) {
            this.screenX -= this.movementSpeed;
            this.animate("left");
        }
    }
    moveRight(inputMngr) {
        if (inputMngr.notPressingA()) {
            this.screenX += this.movementSpeed;
            this.animate("right");
        }
    }
    moveUp(inputMngr) {
        this.screenY -= this.movementSpeed;
        if (inputMngr.pressingWOnly() || inputMngr.pressingDnA()) {
            this.animate("up");
        }
    }
    moveDown(inputMngr) {
        this.screenY += this.movementSpeed;
        if (inputMngr.pressingSOnly() || inputMngr.pressingDnA()) {
            this.animate("down");
        }
    }
}
