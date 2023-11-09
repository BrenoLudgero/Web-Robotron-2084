export {Player};
import {Actor} from "../models/actor.js";
import {Projectile} from "../models/projectile.js";

class Player extends Actor {
    constructor(game) {
        super(game, 15, 24);
        this.game = game;
        this.sprites.src = game.spritesIndex.player;
        this.screenXPosition = (game.canvas.width / 2) - this.width;
        this.screenYPosition = (game.canvas.height / 2) - this.height;
        this.movementSpeed = 3.8;
        this.movementAnimationDelay = 2;
        this.projectileSpeed = 28;
        this.projectileTimer = 0;
        this.projectileDelay = 7
    };
    update() {
        this.game.input.update();
        this.updateProjectiles();
        this.projectileTimer --
    };
    shoot(left, right, up, down, yOffset) {
        const playerXPosition = this.screenXPosition + 9;
        const playerYPosition = this.screenYPosition + yOffset;
        if (this.projectileTimer <= 0) {
            this.projectiles.push(new Projectile(this.game, playerXPosition, playerYPosition, this.projectileSpeed, left, right, up, down));
            this.projectileTimer = this.projectileDelay
        }
    };
    cyclePlayerSprite(spritesheetYPosition) {
        this.spritesheetYPosition = spritesheetYPosition;
        if (this.game.globalCounter % this.movementAnimationDelay == 0) {
            if (this.spritesheetXPosition < (this.sprites.width - this.width)) {
                this.spritesheetXPosition += 16
            } else {
                this.spritesheetXPosition = 0
            }
        }
    };
    updateProjectiles() {
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete)
    };
    moveLeft() {
        this.screenXPosition -= this.movementSpeed;
        this.cyclePlayerSprite(51)
    };
    moveRight() {
        this.screenXPosition += this.movementSpeed;
        this.cyclePlayerSprite(75)
    };
    moveUp(keysPressed) {
        this.screenYPosition -= this.movementSpeed;
        if (this.game.input.pressingWOnly(keysPressed)) this.cyclePlayerSprite(26)
    };
    moveDown(keysPressed) {
        this.screenYPosition += this.movementSpeed;
        if (this.game.input.pressingSOnly(keysPressed)) this.cyclePlayerSprite(0)
    }
}
