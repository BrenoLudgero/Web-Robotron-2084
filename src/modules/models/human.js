export {Human};
import {Actor} from "./actor.js";
import {cycleSprite} from "../helpers/globals.js";
import {ArtificialIntelligence} from "../managers/ai-mngr.js";

class Human extends Actor {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000;
        this.ai = new ArtificialIntelligence;
        this.wasRescued = false;
        this.movementType = 2; // 8-way movement
        this.movementSpeed = 4;
        this.minPlayerSpawnDistance = 100; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        this.minHumanSpawnDistance = 150
        // screenX and screenY positions defined in game.addHuman()
    };
    update() {
        if (this.game.globalTimer % this.movementAnimationDelay == 0) {
            this.ai.moveRandomly(this);
            this.animate();
        }
    };
    animate() {
        switch(this.currentDirection) {
            case("left"):
            case("upleft"):
            case("downleft"):
                cycleSprite(this, 16, 59); break
            case("right"):
            case("upright"):
            case("downright"):
                cycleSprite(this, 16, 88); break
            case("up"):
                cycleSprite(this, 16, 30); break
            case("down"):
                cycleSprite(this, 16, 0); break
        }
    }
}
