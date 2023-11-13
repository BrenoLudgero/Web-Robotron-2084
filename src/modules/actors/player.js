export {Player};
import {Actor} from "../models/actor.js";

class Player extends Actor {
    constructor(game) {
        super(game, 15, 24);
        this.game = game;
        this.sprites.src = game.spritesIndex.player;
        this.screenX = (game.ui.canvas.width / 2) - this.width;
        this.screenY = (game.ui.canvas.height / 2) - this.height;
        this.lives = 3; // Updated in collisionMngr.checkPlayerCollision
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSpeed = 28;
        this.projectileTimer = 0;
        this.projectileDelay = 7
    };
    update() {
        this.game.inputMngr.update();
        this.projectileTimer --
    };
    shoot(left, right, up, down, yOffset) { // Called in inputMngr.readShootingKeys
        const playerX = this.screenX + 9;
        const playerY = this.screenY + yOffset;
        if (this.projectileTimer <= 0) {
            this.game.projectileMngr.createProjectile(playerX, playerY, this.projectileSpeed, left, right, up, down);
            this.projectileTimer = this.projectileDelay
        }
    };
    cyclePlayerSprite(spritesheetY) {
        this.spritesheetY = spritesheetY;
        if (this.game.globalTimer % this.movementAnimationDelay == 0) {
            if (this.spritesheetX < (this.sprites.width - this.width)) {
                this.spritesheetX += 16
            } else {
                this.spritesheetX = 0
            }
        }
    };
    moveLeft() {
        this.screenX -= this.movementSpeed;
        this.cyclePlayerSprite(51)
    };
    moveRight() {
        this.screenX += this.movementSpeed;
        this.cyclePlayerSprite(75)
    };
    moveUp(keysPressed) {
        this.screenY -= this.movementSpeed;
        if (this.game.inputMngr.pressingWOnly(keysPressed)) this.cyclePlayerSprite(26)
    };
    moveDown(keysPressed) {
        this.screenY += this.movementSpeed;
        if (this.game.inputMngr.pressingSOnly(keysPressed)) this.cyclePlayerSprite(0)
    }
}
