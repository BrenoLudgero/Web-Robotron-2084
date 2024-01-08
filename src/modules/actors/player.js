export {Player};
import {Actor} from "../models/actor.js";
import {setHitbox, setMovementBoundaries} from "../helpers/globals.js";

class Player extends Actor {
    constructor(game) {
        super(game, 15, 24);
        this.sprites.src = game.spritesIndex.player;
        this.screenX = (game.uiMngr.canvas.width / 2) - this.width;
        this.screenY = (game.uiMngr.canvas.height / 2) - this.height;
        this.lives = 3; // Updated in collisionMngr.checkPlayerCollision
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSprite = game.spritesIndex.playerProjectile;
        this.projectileSpeed = 25;
        this.projectileTimer = 0;
        this.projectileDelay = 7;
        setHitbox(this, 1, 3, 1, 1);
    }
    update() {
        setMovementBoundaries(this);
        this.updateProjectileTimer();
    }
    // Called in inputMngr.readShootingKeys
    shoot(left, right, up, down, yOffset) {
        const xOffset = 9;
        const playerX = this.screenX + xOffset;
        const playerY = this.screenY + yOffset;
        if (this.projectileTimer <= 0) {
            this.game.projectileMngr.createProjectile(this.projectileSprite, playerX, playerY, this.projectileSpeed, left, right, up, down);
            this.projectileTimer = this.projectileDelay;
            this.game.soundMngr.playSound(this.game.soundFxIndex.playerShot, 1, 0.1);
        }
    }
    updateProjectileTimer() {
        if (this.projectileTimer > 0) {
            this.projectileTimer --;
        }
    }
    cyclePlayerSprite(spritesheetY) {
        this.spritesheetY = spritesheetY;
        if (this.game.globalTimer % this.movementAnimationDelay === 0) {
            if (this.spritesheetX < (this.sprites.width - this.width)) {
                this.spritesheetX += 16;
            } else {
                this.spritesheetX = 0;
            }
        }
    }
    // Methods below called inputMngr.readMovementKeys
    moveLeft() {
        this.screenX -= this.movementSpeed;
        setHitbox(this, 8, 4, 2, 0);
        this.cyclePlayerSprite(51);
    }
    moveRight() {
        this.screenX += this.movementSpeed;
        setHitbox(this, 8, 4, 2, 0);
        this.cyclePlayerSprite(75);
    }
    moveUp(keysPressed) {
        this.screenY -= this.movementSpeed;
        setHitbox(this, 1, 3, 1, 1);
        if (this.game.inputMngr.pressingWOnly(keysPressed)) {
            this.cyclePlayerSprite(26);
        }
    }
    moveDown(keysPressed) {
        this.screenY += this.movementSpeed;
        setHitbox(this, 1, 3, 1, 1);
        if (this.game.inputMngr.pressingSOnly(keysPressed)) {
            this.cyclePlayerSprite(0);
        }
    }
}
