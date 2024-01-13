export {Human};
import {Actor} from "./actor.js";
import {setHitbox, cycleSprite} from "../helpers/globals.js";
import {ArtificialIntelligence} from "./ai.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000; // Awarded by collisionMngr.checkHumanCollisions
        this.ai = new ArtificialIntelligence();
        this.wasRescued = false;
        this.movementType = 2; // 8 directions
        this.movementSpeed = 4;
        this.movementAnimationDelay = 9;
        this.minPlayerSpawnDistance = 100; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = 50;
        if (this.isMommyOrDaddy()) {
            setHitbox(this, 2, 2, 0, 1);
        }
        // screenX and screenY positions defined in actorMngr.addHuman
    }
    update() {
        const {game, movementAnimationDelay, ai, currentDirection} = this;
        if (game.globalTimer % movementAnimationDelay === 0) {
            ai.moveRandomly(this);
            this.animate(currentDirection);
        }
    }
    isMommyOrDaddy() {
        return (
            this.constructor.name === "Mommy"
            || this.constructor.name === "Daddy"
        );
    }
    animate(currentDirection) {
        if (currentDirection === "up") {
            cycleSprite(this, 16, 30);
            setHitbox(this, 2, 2, 0, 1);
        }
        if (currentDirection === "down") {
            cycleSprite(this, 16, 0);
            setHitbox(this, 2, 2, 0, 1);
        }
        if (currentDirection === "left"
            || currentDirection === "upleft"
            || currentDirection === "downleft") {
                cycleSprite(this, 16, 59);
                setHitbox(this, 4, 4, 0, 0);
        }
        if (currentDirection === "right"
            || currentDirection === "upright"
            || currentDirection === "downright") {
                cycleSprite(this, 16, 88);
                setHitbox(this, 4, 4, 0, 2);
        }
    }
}
