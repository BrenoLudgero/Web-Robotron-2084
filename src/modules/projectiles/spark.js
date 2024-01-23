export {Spark};
import {Projectile} from "../models/projectile.js";
import {RNG, canAnimate, getDistanceBetween} from "../helpers/globals.js";

class Spark extends Projectile {
    constructor(sprite, screenX, screenY, speed) {
        super(sprite, screenX, screenY, speed)
        this.width = 21;
        this.height = 21;
        this.sprite = sprite;
        this.animationDelay = 5;
        this.screenX = screenX;
        this.screenY = screenY;
        this.speed = speed;
    }
    rotateProjectile(game) {
        if (canAnimate(this, game)) {
            this.angle += 45;
        }
    }
    // Moves to the player's position at the time of shooting (plus or minus 0-80 pixels)
    moveProjectile(game) {
        const {player} = game.actorMngr.actors;
        if (!this.fired) {
            const randomOffset = RNG(0, 80);
            const distanceX = player.screenX - (this.screenX + randomOffset);
            const distanceY = player.screenY - (this.screenY + randomOffset);
            const distance = getDistanceBetween(this, player);
            const directionX = distanceX / distance;
            const directionY = distanceY / distance;
            this.directionX = directionX;
            this.directionY = directionY;
            this.fired = true;
        }
        this.screenX += this.directionX * this.speed;
        this.screenY += this.directionY * this.speed;
        this.rotateProjectile(game);
    }
}
