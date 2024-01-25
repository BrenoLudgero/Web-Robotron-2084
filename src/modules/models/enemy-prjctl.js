export {EnemyProjectile};
import {Projectile} from "./projectile.js";
import {RNG, getDistanceBetween, getActorName} from "../helpers/globals.js";

class EnemyProjectile extends Projectile {
    constructor(sprite, screenX, screenY, speed) {
        super(sprite, screenX, screenY, speed);
        this.points = 25;
        this.sprite = sprite;
        this.animationDelay = speed;
        this.screenX = screenX;
        this.screenY = screenY;
        this.speed = speed;
    }
    move(game) {
        this.setMovementBoundaries(game);
        this.shoot(game);
        this.moveToDirection();
        this.executeExclusiveBehavior(game)
        this.stayWithinCanvas();
        this.elapseTimeOnScreen();
        this.vanishAfterTimeElapsed();
    }
    // Moves to the player's position at the time of shooting (plus or minus randomOffset)
    shoot(game) {
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
        if (!this.movementBoundaries) {
            const {ui} = game;
            this.movementBoundaries = {
                "x": ui.canvas.width - this.width,
                "y": ui.canvas.height - this.height
            };
        }
    }
    executeExclusiveBehavior(game) {
        const actorName = getActorName(this);
        switch (actorName) {
            case "spark":
                this.rotate(game); break;
            case "bouncebomb":
                this.bounce(game); break;
        }
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
