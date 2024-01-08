export {Hulk};
import {Enemy} from "../../models/enemy.js";
import {setHitbox, cycleSprite} from "../../helpers/globals.js";

class Hulk extends Enemy {
    constructor(game) {
        super(game, 26, 32);
        this.sprites.src = game.spritesIndex.hulk;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE
        this.movementAnimationDelay = 9;
        this.minHumanSpawnDistance = 80;
        this.isHulk = true;
    }
    update() {
        if (this.game.globalTimer % this.movementAnimationDelay === 0) {
            this.ai.moveRandomly(this);
            this.animate();
        }
    }
    animate() {
        switch(this.currentDirection) {
            case("left"):
                setHitbox(this, 16, 16, -1, -4);
                cycleSprite(this,28, 33);
                break;
            case("right"):
                setHitbox(this, 16, 16, 0, -4);
                cycleSprite(this,28, 65);
                break;
            case("up"):
            case("down"):
                setHitbox(this, 0, 14, 0, -2);
                cycleSprite(this,28, 0);
                break;
        }
    }
}
