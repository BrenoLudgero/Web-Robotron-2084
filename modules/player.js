export {Player};
import {Actor} from "./models/actor.js";
import {Projectile} from "./models/projectile.js";

class Player extends Actor {
    constructor(game) {
        super(game);
        this.game = game;
        this.width = 15;
        this.adjustedWidth = 25;
        this.height = 24;
        this.adjustedHeight = 43;
        this.spritesheetXPosition = 10;
        this.spritesheetYPosition = 371;
        this.screenXPosition = (game.canvas.width / 2) - this.width;
        this.screenYPosition = (game.canvas.height / 2) - this.height;
        this.movementSpeed = 6;
        this.movementAnimationDelay = 1;
        this.projectileTimer = 0;
        this.projectileDelay = 4;
        this.projectiles = []
    };
    update() {
        this.game.input.update();
        this.updateProjectiles();
        this.projectileTimer --
    };
    move(movingHorizontally, movingVertically) {
        const {keysPressed} = this.game;
        if (movingHorizontally && movingVertically) {
            this.spritesheetYPosition = 478;
            this.screenXPosition += this.movementSpeed;
            this.cycleSprite()
        } else if (movingHorizontally && !movingVertically) {
            this.spritesheetYPosition = 445;
            this.screenXPosition -= this.movementSpeed;
            this.cycleSprite()
        } else if (!movingHorizontally && movingVertically) {
            this.screenYPosition -= this.movementSpeed;
            if (!keysPressed.includes("d") && !keysPressed.includes("a") && !keysPressed.includes("s")) {
                this.spritesheetYPosition = 409;
                this.cycleSprite()
            }
        } else if (!movingHorizontally && !movingVertically) {
            this.screenYPosition += this.movementSpeed;
            if (!keysPressed.includes("d") && !keysPressed.includes("a") && !keysPressed.includes("w")) {
                this.spritesheetYPosition = 371;
                this.cycleSprite()
            }
        }
    };
    shoot(screenXPosition, screenYPosition, left, right, up, down) {
        if (this.projectileTimer <= 0) {
            this.projectiles.push(new Projectile(this.game, screenXPosition, screenYPosition, 30, 0.6, left, right, up, down));
            this.projectileTimer = this.projectileDelay
        }
    };
    cycleSprite() {
        if (this.game.currentFrame % this.movementAnimationDelay == 0) {
            if (this.spritesheetXPosition < 88) {
                this.spritesheetXPosition += 26
            } else {
                this.spritesheetXPosition = 10
            }
        }
    };
    updateProjectiles() {
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete)
    }
}
