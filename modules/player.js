export {Player}
import {Actor} from "./actors.js"
import {Projectile} from "./projectile.js"
import {setMovementBoundaries} from "./global_functions.js";

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
        this.screenXPosition = game.canvas.width /2 - this.width;
        this.screenYPosition = game.canvas.height /2 - this.height;
        this.movementSpeed = 3.5;
        this.movementAnimationDelay = 4;
        this.projectiles = [];
        this.projectileTimer = 0;
        this.projectileDelay = 9;
        this.movementBoundaries = {
            "x": 990,
            "y": 742
        };
        this.spriteCycle = function () {
            if (game.currentFrame % this.movementAnimationDelay == 0) {
                if (this.spritesheetXPosition < 88) {
                    this.spritesheetXPosition += 26
                } else {
                    this.spritesheetXPosition = 10
                }
            }
        };
        this.move = function(movingHorizontally, movingVertically) {
            if (movingHorizontally && movingVertically) {
                this.spriteCycle(),
                this.spritesheetYPosition = 478,
                this.screenXPosition += this.movementSpeed
            } else if (movingHorizontally && !movingVertically) {
                this.spriteCycle(),
                this.spritesheetYPosition = 445,
                this.screenXPosition -= this.movementSpeed
            } else if (!movingHorizontally && movingVertically) {
                this.screenYPosition -= this.movementSpeed;
                if (!game.keysPressed.includes("d") && !game.keysPressed.includes("a") && !game.keysPressed.includes("s")) {
                    this.spritesheetYPosition = 409,
                    this.spriteCycle()
                }
            } else if (!movingHorizontally && !movingVertically) {
                this.screenYPosition += this.movementSpeed;
                if (!game.keysPressed.includes("d") && !game.keysPressed.includes("a") && !game.keysPressed.includes("w")) {
                    this.spritesheetYPosition = 371,
                    this.spriteCycle()
                }
            }
        };
        this.shoot = function(screenXPosition, screenYPosition, left, right, up, down) {
            if (this.projectileTimer <= 0) {
                this.projectiles.push(new Projectile(game, screenXPosition, screenYPosition, left, right, up, down)), 
                this.projectileTimer = this.projectileDelay
            }
        }
    };
    update() {
        this.game.input.update();
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete);
        this.projectileTimer --;
        setMovementBoundaries(this, this.movementBoundaries["x"], this.movementBoundaries["y"])
    }
}
