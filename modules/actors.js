export {Actor, Enemy, Human};
import {setMovementBoundaries} from "./global_functions.js";

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
    update() {
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
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
    }
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
        this.movementSpeed = 0.6;
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
};

function setRandomDirection(actor) {
    const fourDirections = ["left", "right", "up", "down"];
    const eightDirections = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
    if (actor.movementType == 1) {
        return fourDirections[Math.floor(Math.random() * fourDirections.length)]
    } else if (actor.movementType == 2) {
        return eightDirections[Math.floor(Math.random() * eightDirections.length)]
    }
};
function setRandomWalkDistance() {
    const distances = [500, 650, 800];
    return distances[Math.floor(Math.random() * distances.length)]
};
function walkRandomly(actor) {
    if (actor.remainingWalkingDistance > 0) {
        switch(actor.currentDirection) {
            case("left"):
                actor.screenXPosition -= actor.movementSpeed
                break
            case("right"):
                actor.screenXPosition += actor.movementSpeed
                break;
            case("up"):
                actor.screenYPosition -= actor.movementSpeed
                break
            case("down"):
                actor.screenYPosition += actor.movementSpeed
                break
            case("upleft"):
                actor.screenYPosition -= actor.movementSpeed,
                actor.screenXPosition -= actor.movementSpeed
                break
            case("upright"):
                actor.screenYPosition -= actor.movementSpeed,
                actor.screenXPosition += actor.movementSpeed
                break
            case("downleft"):
                actor.screenYPosition += actor.movementSpeed,
                actor.screenXPosition -= actor.movementSpeed
                break
            case("downright"):
                actor.screenYPosition += actor.movementSpeed,
                actor.screenXPosition += actor.movementSpeed
                break
        }
        actor.remainingWalkingDistance -= actor.movementRate
    } else {
        actor.currentDirection = setRandomDirection(actor);
        actor.remainingWalkingDistance = setRandomWalkDistance();
    }
};
function isActorAgainstWall(actor) {
    if (actor.screenXPosition >= actor.playableArea["x"] ||
        actor.screenXPosition <= 2 ||
        actor.screenYPosition >= actor.playableArea["y"] ||
        actor.screenYPosition <= 2) {
            return true
    }
};
function turnAwayFromWall(actor) {
    if (isActorAgainstWall(actor)) {
        switch(actor.currentDirection) {
            case("left"):
                actor.currentDirection = "right"
                break
            case("right"):
                actor.currentDirection = "left"
                break;
            case("up"):
                actor.currentDirection = "down"
                break
            case("down"):
                actor.currentDirection = "up"
                break
            case("upleft"):
                actor.currentDirection = "downright"
                break
            case("upright"):
                actor.currentDirection = "downleft"
                break
            case("downleft"):
                actor.currentDirection = "upright"
                break
            case("downright"):
                actor.currentDirection = "upleft"
                break
        }
    }
}
