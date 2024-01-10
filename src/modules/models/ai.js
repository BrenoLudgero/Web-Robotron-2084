export {ArtificialIntelligence};
import {RNG, cycleSprite, setMovementBoundaries} from "../helpers/globals.js";

class ArtificialIntelligence {
    constructor(game) {
        this.game = game;
        this.walkDistances = new Array(6);
        this.directions = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
    }
    // Grunts only
    chasePlayer(actor) {
        if (actor.screenX > this.game.player.screenX) {
            actor.screenX -= actor.movementSpeed;
        } else {
            actor.screenX += actor.movementSpeed;
        }
        if (actor.screenY > this.game.player.screenY) {
            actor.screenY -= actor.movementSpeed;
        } else {
            actor.screenY += actor.movementSpeed;
        }
    }
    // Grunts only. 50% change to chasePlayer
    moveAtRandomIntervals(actor) {
        let randomNumber = RNG(1, 2);
        if (randomNumber === 1) {
            this.chasePlayer(actor);
            cycleSprite(actor, 20, 0);
            this.game.soundMngr.playSound(this.game.soundFxIndex.gruntStep, 1);
        }
    }
    // Returns one of 4 or 8 directions based on the actor's movementType
    setRandomDirection(actor) {
        const numDirections = (actor.movementType === 1 ? 4 : 8);
        return this.directions[Math.floor(Math.random() * numDirections)];
    }
    // Fills walkDistances with randomly generated numbers
    setRandomWalkDistance() {
        for (let i = 0; i < this.walkDistances.length; i++) {
            this.walkDistances[i] = RNG(10, 35);
        }
    }
    // Returns one of 6 walkDistances randomly
    getRandomWalkDistance() {
        this.setRandomWalkDistance();
        return this.walkDistances[RNG(0, this.walkDistances.length - 1)];
    }
    // Moves to a random direction for a random distance
    moveToRandomDirection(actor) {
        if (actor.remainingWalkingDistance > 0) {
            switch(actor.currentDirection) {
                case("left"):
                    actor.screenX -= actor.movementSpeed; break;
                case("right"):
                    actor.screenX += actor.movementSpeed; break;
                case("up"):
                    actor.screenY -= actor.movementSpeed; break;
                case("down"):
                    actor.screenY += actor.movementSpeed; break;
                case("upleft"):
                    actor.screenY -= actor.movementSpeed;
                    actor.screenX -= actor.movementSpeed; break;
                case("upright"):
                    actor.screenY -= actor.movementSpeed;
                    actor.screenX += actor.movementSpeed; break;
                case("downleft"):
                    actor.screenY += actor.movementSpeed;
                    actor.screenX -= actor.movementSpeed; break;
                case("downright"):
                    actor.screenY += actor.movementSpeed;
                    actor.screenX += actor.movementSpeed; break;
            }
            actor.remainingWalkingDistance--;
        } else {
            actor.currentDirection = this.setRandomDirection(actor);
            actor.remainingWalkingDistance = this.getRandomWalkDistance();
        }
    }
    isActorAgainstWall(actor) {
        const movementBoundaries = setMovementBoundaries(actor);
        return (
            actor.screenX >= movementBoundaries.x 
            || actor.screenX <= 2 
            || actor.screenY >= movementBoundaries.y 
            || actor.screenY <= 2
        );
    }
    moveAwayFromWall(actor) {
        if (this.isActorAgainstWall(actor)) {
            actor.currentDirection = this.setRandomDirection(actor);
        }
    }
    moveRandomly(actor) {
        this.moveToRandomDirection(actor);
        this.moveAwayFromWall(actor);
    }
}
