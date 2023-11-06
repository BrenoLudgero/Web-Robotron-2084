export {Player};
import {Actor} from "./models/actor.js";
import {Projectile} from "./models/projectile.js";

class Player extends Actor {
    constructor(game) {
        super(game, 15, 24);
        this.game = game;
        this.sprites.src = "../images/player.png";
        this.screenXPosition = (game.canvas.width / 2) - this.width;
        this.screenYPosition = (game.canvas.height / 2) - this.height;
        this.movementSpeed = 6;
        this.movementAnimationDelay = 1;
        this.projectileSpeed = 50;
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
            this.screenXPosition += this.movementSpeed;
            this.cyclePlayerSprite(75)
        } else if (movingHorizontally && !movingVertically) {
            this.screenXPosition -= this.movementSpeed;
            this.cyclePlayerSprite(51)
        } else if (!movingHorizontally && movingVertically) {
            this.screenYPosition -= this.movementSpeed;
            if (!keysPressed.includes("d") && !keysPressed.includes("a") && !keysPressed.includes("s")) {
                this.cyclePlayerSprite(26)
            }
        } else if (!movingHorizontally && !movingVertically) {
            this.screenYPosition += this.movementSpeed;
            if (!keysPressed.includes("d") && !keysPressed.includes("a") && !keysPressed.includes("w")) {
                this.cyclePlayerSprite(0)
            }
        }
    };
    shoot(left, right, up, down) {
        const playerXPosition = this.screenXPosition + 11;
        const playerYPosition = this.screenYPosition;
        if (this.projectileTimer <= 0) {
            this.projectiles.push(new Projectile(this.game, playerXPosition, playerYPosition, this.projectileSpeed, left, right, up, down));
            this.projectileTimer = this.projectileDelay
        }
    };
    cyclePlayerSprite(spritesheetYPosition) {
        this.spritesheetYPosition = spritesheetYPosition;
        if (this.game.currentFrame % this.movementAnimationDelay == 0) {
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
    }
}
