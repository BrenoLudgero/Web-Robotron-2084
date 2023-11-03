export {Human};
import {Actor} from "../models/actor.js";
import {setMovementBoundaries, moveAwayFromWall, walkRandomly, setRandomDirection} from "../global_functions.js";

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
        moveAwayFromWall(this);
        walkRandomly(this);
        setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
    }
}
