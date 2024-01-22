export {Spheroid};
import {Spawner} from "../../models/spawner.js";
import {Grunt} from "./grunt.js";

class Spheroid extends Spawner {
    constructor(game) {
        super(game, 30, 30);
        this.enemyToSpawn = Grunt;
        this.spawnAmount = 1; // CHANGES ACCORDING TO WAVE
        this.spawnSound = "enforcerSpawn";
        this.minDistanceFromPlayer = 700;
        // Hitbox based on the currentSprite
        this.hitboxConfig = {
            1: {itself: {width: 4, height: 4, xPosition: 20, yPosition: 20}},
            2: {itself: {width: 9, height: 9, xPosition: 18, yPosition: 18}},
            3: {itself: {width: 13, height: 13, xPosition: 16, yPosition: 16}},
            4: {itself: {width: 16, height: 16, xPosition: 14, yPosition: 15}},
            5: {itself: {width: 23, height: 23, xPosition: 11, yPosition: 11}},
            6: {itself: {width: 29, height: 29, xPosition: 8, yPosition: 8}},
            7: {itself: {width: 27, height: 27, xPosition: 9, yPosition: 9}},
            8: {itself: {width: 0, height: 0, xPosition: this.hidden, yPosition: this.hidden}}
        };
        this.hitboxes = this.hitboxConfig[1];
    }
    update() {
        this.animate();
        this.ai.moveInRelationToPlayer(this, this.game); // Avoids Player
        this.stayWithinCanvas();
    }
}
