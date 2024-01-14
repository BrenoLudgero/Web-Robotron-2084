export {Hulk};
import {Enemy} from "../../models/enemy.js";
import {setHitbox, cycleSprite} from "../../helpers/globals.js";

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
    update(game) {
        const {ai, movementAnimationDelay} = this;
        if (this.canMove(movementAnimationDelay, game)) {
            ai.moveRandomly(this);
            this.animate();
        }
    }
    canMove(movementAnimationDelay, game) {
        return game.globalTimer % movementAnimationDelay === 0;
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
