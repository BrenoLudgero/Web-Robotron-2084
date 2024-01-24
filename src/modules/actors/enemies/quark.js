export {Quark};
import {Spawner} from "../../models/spawner.js";
import {Enforcer} from "../enemies/enforcer.js";

class Quark extends Spawner {
    constructor(game) {
        super(game);
        this.enemyToSpawn = Enforcer;
        this.spawnAmount = 3; // CHANGES ACCORDING TO WAVE
        this.spawnSound = "tankSpawn";
        this.animationDelay = 7;
        this.lastSprite = 4; // Sprite animation stops on this sprite before restarting
        this.movementType = 2; // 8 directions
    }
    update() {
        this.animate();
        this.ai.moveRandomly(this);
    }
}
