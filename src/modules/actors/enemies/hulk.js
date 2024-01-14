export {Hulk};
import {Enemy} from "../../models/enemy.js";
import {setHitbox, cycleSprite, canMove} from "../../helpers/globals.js";

class Hulk extends Enemy {
    constructor(game, spritesIndex) {
        super(game, 26, 32);
        this.sprites.src = spritesIndex.hulk;
        this.spritesheetIncrement = 28;
        this.movementSpeed = 8; // INCREASES ACCORDING TO WAVE
        this.movementAnimationDelay = 9;
        this.minHumanSpawnDistance = 90;
        setHitbox(this, 0, 18, 0, 2);
    }
    update() {
        if (canMove(this)) {
            this.ai.moveRandomly(this);
            this.animate();
        }
    }
    animate() {
        switch(this.currentDirection) {
            case("left"):
                cycleSprite(this, 33); 
                setHitbox(this, 14, 16, 0, -4); break;
            case("right"):
                cycleSprite(this, 65); 
                setHitbox(this, 14, 16, 0, -4); break;
            case("up"):
            case("down"):
                cycleSprite(this, 0); 
                setHitbox(this, 0, 18, 0, 2); break;
        }
    }
}
