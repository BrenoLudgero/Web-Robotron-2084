export {Actor, Enemy, Human};
import {setRandomDirection} from "./global_functions.js"

class Actor {
    constructor(game) {
        this.game = game;
        this.width;
        this.adjustedWidth;
        this.height;
        this.adjustedHeight;
        this.spritesheetXPosition;
        this.spritesheetYPosition;
        this.screenXPosition;
        this.screenYPosition;
        this.movementSpeed;
        this.movementAnimationDelay;
        this.projectiles = [];
        this.projectileTimer;
        this.projectileDelay;
        this.isAlive = true;
        this.movementBoundaries
    };
    draw(context) {
        context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
        this.projectiles.forEach(projectile => projectile.draw(context));
        this.game.drawHitboxes(this)
    }
};

class Enemy extends Actor {
    constructor(game) {
        super(game);
        this.isHulk = false;
        this.movementType = 1;
        this.movementTimer;
        this.movementInterval;
        this.movementRate = 5;  //  DO  NOT  CHANGE !
        this.walkDistance;
        this.remainingWalkingDistance = this.walkDistance;
        this.currentDirection = setRandomDirection(this)
        // screenX and screenY positions defined in game.addEnemy()
    };
    update() {
        turnAwayFromWall(this);
        walkRandomly(this);
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
    }
};

class Human extends Actor {
    constructor(game) {
        super(game);
        this.wasRescued = false;
        this.movementType = 2;
        this.movementRate = 4;
        this.movementSpeed = 3;
        this.walkDistance;
        this.remainingWalkingDistance = this.walkDistance;
        this.currentDirection = setRandomDirection(this)
        // screenX and screenY positions defined in game.addHuman()
    };
    update() {
        turnAwayFromWall(this);
        walkRandomly(this);
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
    }
}
