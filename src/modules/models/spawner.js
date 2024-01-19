export {Spawner};
import {Enemy} from "./enemy.js";
import {Grunt} from "../actors/enemies/grunt.js";

class Spawner extends Enemy {
    constructor(game, originalWidth, originalHeight) {
        super(game, originalWidth, originalHeight);
        this.points = 1000;
        this.animationDelay = 5;
        this.finalSprite = 5; // Stops on the fifth sprite
        this.secondsBeforeSpawning = 5; // Start spawning enemies after this amount of seconds
        this.enemiesToSpawn = 3;
        this.updatesBetweenSpawns = 0;
        this.currentSprite = 1;
        setTimeout(() => {
            this.startingSprite = 0;
            this.finalSprite = 8;
            this.animationDelay = 4;
            this.updateState("spawning");
        }, this.secondsBeforeSpawning * 1000);
    }
    update() {
        this.animate();
        this.spawnEnemies();
    }
    spawnEnemies() {
        const {actorMngr} = this.game;
        if (this.currentState === "spawning") {
            if (this.enemiesToSpawn > 0) {
                if (this.updatesBetweenSpawns <= 0) {
                    actorMngr.addSpawnerEnemy(this, 1, Grunt);
                    this.enemiesToSpawn --;
                    this.updatesBetweenSpawns = 180; // 3 seconds
                }
                else {
                    this.updatesBetweenSpawns --;
                }
            }
            else {
                this.updateState("destroyed");
            }
        }
    }
    animate() {
        if (this.game.globalTimer % this.animationDelay === 0) {
            this.game.spriteMngr.nextSpawnerSprite(this);
            this.game.hitboxMngr.updateSpawnerHitbox(this);
        }
    }
}
