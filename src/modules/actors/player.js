export {Player};
import {Actor} from "../models/actor.js";
import {setHitbox, setMovementBoundaries} from "../helpers/globals.js";

class Player extends Actor {
    constructor(game, spritesIndex) {
        super(game, 15, 24);
        this.sprites.src = spritesIndex.player;
        this.screenX = (game.ui.canvas.width / 2) - this.width;
        this.screenY = (game.ui.canvas.height / 2) - this.height;
        this.lives = 3; // Updated in collisionMngr.checkPlayerCollision
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSprite = spritesIndex.playerProjectile;
        this.projectileSpeed = 25;
        this.projectileTimer = 0;
        this.projectileDelay = 7;
        setHitbox(this, 1, 3, 1, 1);
    }
    update() {
        setMovementBoundaries(this);
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
    cyclePlayerSprite(spritesheetY) {
        const {game, movementAnimationDelay} = this;
        this.spritesheetY = spritesheetY;
        if (game.globalTimer % movementAnimationDelay === 0) {
            if (this.spritesheetX < (this.sprites.width - this.width)) {
                this.spritesheetX += 16;
            } else {
                this.spritesheetX = 0;
            }
        }
    }
    animate(direction) { 
        switch(direction) {
            case("left"):
                setHitbox(this, 8, 4, 2, 0);
                this.cyclePlayerSprite(51); break;
            case("right"):
                setHitbox(this, 8, 4, 2, 0);
                this.cyclePlayerSprite(75); break;
            case("up"):
                setHitbox(this, 1, 3, 1, 1);
                this.cyclePlayerSprite(26); break;
            case("down"):
                setHitbox(this, 1, 3, 1, 1);
                this.cyclePlayerSprite(0); break;
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
