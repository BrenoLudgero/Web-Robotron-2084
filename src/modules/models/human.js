export {Human};
import {Actor} from "./actor.js";
import {canMove} from "../helpers/globals.js";
import {ArtificialIntelligence} from "./ai.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000; // Awarded by collisionMngr.checkHumanCollisions
        this.ai = new ArtificialIntelligence();
        this.rescued = false;
        this.movementType = 2; // 8 directions
        this.movementSpeed = 4;
        this.movementAnimationDelay = 9;
        this.minPlayerSpawnDistance = 100; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = 50;
        // screenX and screenY positions defined in actorMngr.addHuman
    }
    update() {
        if (canMove(this)) {
            this.ai.moveRandomly(this);
            this.animate(this, this.currentDirection);
        }
    }
    /* isMommyOrDaddy() {
        return (
            this.constructor.name === "Mommy"
            || this.constructor.name === "Daddy"
        );
    } */
}
