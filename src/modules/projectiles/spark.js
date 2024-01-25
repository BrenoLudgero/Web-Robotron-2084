export {Spark};
import {Projectile} from "../models/projectile.js";
import {RNG, canAnimate, getDistanceBetween} from "../helpers/globals.js";

class Spark extends Projectile {
    constructor(sprite, screenX, screenY, speed) {
        super(sprite, screenX, screenY, speed)
        this.points = 25;
        this.width = 21;
        this.height = 21;
        this.sprite = sprite;
        this.animationDelay = speed;
        this.screenX = screenX;
        this.screenY = screenY;
        this.speed = speed;
        this.timeOnScreen = 150; // Time in updates (2.5 seconds)
    }
    rotate(game) {
        if (canAnimate(this, game)) {
            this.angle += 45;
        }
    }
    vanishAfterTimeElapsed() {
        if (this.timeOnScreen <= 0) {
            this.updateState("vanished");
        }
    }
    // Moves to the player's position at the time of shooting (plus or minus randomOffset)
    move(game) {
        const {player} = game.actorMngr.actors;
        if (!this.fired) {
            this.setMovementBoundaries(game);
            const randomXOffset = RNG(0, 40);
            const randomYOffset = RNG(0, 20);
            const distanceX = player.screenX - (this.screenX + randomXOffset);
            const distanceY = player.screenY - (this.screenY + randomYOffset);
            const distance = getDistanceBetween(this, player);
            const directionX = distanceX / distance;
            const directionY = distanceY / distance;
            this.directionX = directionX;
            this.directionY = directionY;
            this.fired = true;
        }
        this.screenX += this.directionX * this.speed;
        this.screenY += this.directionY * this.speed;
        this.rotate(game);
        this.stayWithinCanvas();
        this.timeOnScreen--;
        this.vanishAfterTimeElapsed();
    }
    setMovementBoundaries(game) {
        const {ui} = game;
        this.movementBoundaries = {
            "x": ui.canvas.width - this.width,
            "y": ui.canvas.height - this.height
        };
    }
    touchingCeiling() {
        return this.screenY <= 2;
    }
    touchingFloor() {
        return this.screenY >= this.movementBoundaries.y;
    }
    touchingLeftWall() {
        return this.screenX <= 2;
    }
    touchingRightWall() {
        return this.screenX >= this.movementBoundaries.x;
    }
    stayWithinCanvas() {
        const ceilingY = 2;
        const leftWallX = 2;
        if (this.touchingCeiling()) {
            this.screenY = ceilingY;
        } 
        else if (this.touchingFloor()) {
            this.screenY = this.movementBoundaries.y;
        }
        if (this.touchingLeftWall()) {
            this.screenX = leftWallX;
        } 
        else if (this.touchingRightWall()) {
            this.screenX = this.movementBoundaries.x;
        }
    }
}
