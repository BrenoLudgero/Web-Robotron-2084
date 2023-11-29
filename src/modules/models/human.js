export {Human};
import {Actor} from "./actor.js";
import {setHitbox, cycleSprite} from "../helpers/globals.js";
import {ArtificialIntelligence} from "../managers/ai-mngr.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000; // Awarded by collisionMngr.checkHumanCollisions
        this.ai = new ArtificialIntelligence();
        this.wasRescued = false;
        this.movementType = 2; // 8 directions
        this.movementSpeed = 4;
        this.minPlayerSpawnDistance = 100; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = 150;
        // screenX and screenY positions defined in actorMngr.addHuman()
    }
    update() {
        if (this.game.globalTimer % this.movementAnimationDelay === 0) {
            this.ai.moveRandomly(this);
            this.animate();
        }
    }
    animate() {
        if (this.currentDirection === "up") {
            setHitbox(this, 2, 2, 0, 1);
            cycleSprite(this, 16, 30);
        }
        if (this.currentDirection === "down") {
            setHitbox(this, 2, 2, 0, 1);
            cycleSprite(this, 16, 0);
        }
        if (this.currentDirection === "left"
            || this.currentDirection === "upleft"
            || this.currentDirection === "downleft") {
                setHitbox(this, 4, 4, 0, 0);
                cycleSprite(this, 16, 59);
        }
        if (this.currentDirection === "right"
            || this.currentDirection === "upright"
            || this.currentDirection === "downright") {
                setHitbox(this, 4, 4, 0, 2);
                cycleSprite(this, 16, 88);
        }
    }
}
