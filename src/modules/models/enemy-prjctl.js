export {EnemyProjectile};
import {Projectile} from "./projectile.js";
import {RNG, getDistanceBetween} from "../helpers/globals.js";

class EnemyProjectile extends Projectile {
    constructor(sprite, screenX, screenY, speed) {
        super(sprite, screenX, screenY, speed);
        this.points = 25;
        this.sprite = sprite;
        this.animationDelay = speed;
        this.screenX = screenX;
        this.screenY = screenY;
        this.speed = speed;
        this.setMovementBoundaries(game);
    }
    // Moves to the player's position at the time of shooting (plus or minus randomOffset)
    move(game) {
        this.shoot();
        this.moveToDirection();
        this.rotate(game);
        this.stayWithinCanvas();
        this.elapseTimeOnScreen();
        this.vanishAfterTimeElapsed();
    }
    shoot() {
        const {player} = game.actorMngr.actors;
        if (!this.fired) {
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
    }
    moveToDirection() {
        this.screenX += this.directionX * this.speed;
        this.screenY += this.directionY * this.speed;
    }
    elapseTimeOnScreen() {
        if (this.timeOnScreen) {
            this.timeOnScreen--;
        }
    }
    vanishAfterTimeElapsed() {
        if (this.timeOnScreen <= 0) {
            this.updateState("vanished");
        }
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
