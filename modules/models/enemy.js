export {Enemy};
import {Actor} from "../models/actor.js";
import {setMovementBoundaries, turnAwayFromWall, walkRandomly, setRandomDirection} from "../global_functions.js";

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
}
