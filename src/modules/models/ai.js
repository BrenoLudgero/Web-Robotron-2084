export {ArtificialIntelligence};
import {RNG} from "../helpers/globals.js";

class ArtificialIntelligence {
    constructor() {
        this.directions = ["up", "down", "left", "right", "upleft", "upright", "downleft", "downright"];
        this.previousDirections = [];
    }
    // [Player]  [Grunt]
    atPlayerLeft(grunt, player) {
        return grunt.screenX > player.screenX;
    }
    belowPlayer(grunt, player) {
        return grunt.screenY > player.screenY;
    }
    // Grunts only
    stepTowardsPlayer(grunt, game) {
        const player = game.actorMngr.actors.player;
        if (this.atPlayerLeft(grunt, player)) {
            grunt.screenX -= grunt.movementSpeed;
        } else {
            grunt.screenX += grunt.movementSpeed;
        }
        if (this.belowPlayer(grunt, player)) {
            grunt.screenY -= grunt.movementSpeed;
        } else {
            grunt.screenY += grunt.movementSpeed;
        }
    }
    // Grunts only. 50% change to stepTowardsPlayer
    moveAtRandomIntervals(grunt, game) {
        let randomNumber = RNG(1, 2);
        if (randomNumber === 1) {
            this.stepTowardsPlayer(grunt, game);
            game.soundMngr.playSound("gruntStep", 1);
            game.spriteMngr.cycleSprite(grunt);
            return true;
        }
    }
    moveActor(actor) {
        switch(actor.currentDirection) {
            case("up"):
                actor.screenY -= actor.movementSpeed; break;
            case("down"):
                actor.screenY += actor.movementSpeed; break;
            case("left"):
                actor.screenX -= actor.movementSpeed; break;
            case("right"):
                actor.screenX += actor.movementSpeed; break;
            case("upleft"):
                actor.screenY -= (actor.movementSpeed * 0.8); 
                actor.screenX -= (actor.movementSpeed * 0.8); break;
            case("upright"):
                actor.screenX += (actor.movementSpeed * 0.8); 
                actor.screenY -= (actor.movementSpeed * 0.8); break;
            case("downleft"):
                actor.screenX -= (actor.movementSpeed * 0.8); 
                actor.screenY += (actor.movementSpeed * 0.8); break;
            case("downright"):
                actor.screenX += (actor.movementSpeed * 0.8); 
                actor.screenY += (actor.movementSpeed * 0.8); break;
        }
        actor.remainingWalkingDistance--;
    }
    setRandomWalkDistance(actor) {
        const minDistance = 16;
        const maxDistance = 50;
        actor.remainingWalkingDistance = RNG(minDistance, maxDistance);
    }
    // Returns one of 4 or 8 directions based on the actor's movementType if not found in previousDirections
    getRandomDirection(actor, directions, previousDirections) {
        const numberOfDirections = (actor.movementType === 1 ? 4 : 8);
        let newDirection;
        do {
            newDirection = directions[Math.floor(Math.random() * numberOfDirections)];
        } while (previousDirections.includes(newDirection));
        return newDirection;
    }
    maxCapacity(previousDirections, amountToStore) {
        return previousDirections.length > amountToStore;
    }
    // Stores the actor's last 2 or 4 directions based on its movementType
    storeDirection(actor, previousDirections) {
        let amountToStore = actor.movementType === 1 ? 1 : 3;
        if (this.maxCapacity(previousDirections, amountToStore)) {
            previousDirections.shift();
        }
        previousDirections.push(actor.currentDirection);
    }
    setRandomDirection(actor) {
        const {directions, previousDirections} = this;
        actor.currentDirection = this.getRandomDirection(actor, directions, previousDirections);
        this.storeDirection(actor, previousDirections);
    }
    // Moves to a random direction for a random distance
    moveToRandomDirection(actor) {
        if (actor.remainingWalkingDistance > 0) {
            this.moveActor(actor);
        } else {
            this.setRandomWalkDistance(actor);
            this.setRandomDirection(actor);
        }
    }
    isActorAgainstWall(actor) {
        const {screenX, screenY, movementBoundaries} = actor;
        return (
            screenX >= movementBoundaries.x 
            || screenX <= 2 
            || screenY >= movementBoundaries.y 
            || screenY <= 2
        );
    }
    moveAwayFromWall(actor) {
        if (this.isActorAgainstWall(actor)) {
            this.setRandomDirection(actor);
            this.setRandomWalkDistance(actor);
        }
    }
    moveRandomly(actor) {
        this.moveAwayFromWall(actor);
        this.moveToRandomDirection(actor);
        actor.stayWithinCanvas();
    }
}
