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
        // screenX and screenY positions defined in actorMngr.addHuman
    }
    update() {
        const {game, movementAnimationDelay, ai, currentDirection} = this;
        if (game.globalTimer % movementAnimationDelay === 0) {
            ai.moveRandomly(this);
            this.animate(currentDirection);
        }
    }
    animate(currentDirection) {
        if (currentDirection === "up") {
            setHitbox(this, 2, 2, 0, 1);
            cycleSprite(this, 16, 30);
        }
        if (currentDirection === "down") {
            setHitbox(this, 2, 2, 0, 1);
            cycleSprite(this, 16, 0);
        }
        if (currentDirection === "left"
            || currentDirection === "upleft"
            || currentDirection === "downleft") {
                setHitbox(this, 4, 4, 0, 0);
                cycleSprite(this, 16, 59);
        }
        if (currentDirection === "right"
            || currentDirection === "upright"
            || currentDirection === "downright") {
                setHitbox(this, 4, 4, 0, 2);
                cycleSprite(this, 16, 88);
        }
    }
}
