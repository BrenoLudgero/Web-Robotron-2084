export {ArtificialIntelligence};
import {RNG, cycleSprite, setMovementBoundaries} from "../helpers/globals.js";

class ArtificialIntelligence {
    constructor() {
        this.directions = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
        this.previousDirections = [];
    }
    // Grunts only. Step towards the player
    chasePlayer(grunt, game) {
        const player = game.actorMngr.player;
        if (grunt.screenX > player.screenX) {
            grunt.screenX -= grunt.movementSpeed;
        } else {
            grunt.screenX += grunt.movementSpeed;
        }
        if (grunt.screenY > player.screenY) {
            grunt.screenY -= grunt.movementSpeed;
        } else {
            grunt.screenY += grunt.movementSpeed;
        }
    }
    // Grunts only. 50% change to chasePlayer
    moveAtRandomIntervals(grunt, game) {
        let randomNumber = RNG(1, 2);
        if (randomNumber === 1) {
            this.chasePlayer(grunt, game);
            game.soundMngr.playSound("gruntStep", 1);
            cycleSprite(grunt, 20, 0);
            return true;
        }
    }
    moveActor(actor) {
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
                actor.screenX += actor.movementSpeed; 
                actor.screenY -= actor.movementSpeed; break;
            case("downleft"):
                actor.screenX -= actor.movementSpeed; 
                actor.screenY += actor.movementSpeed; break;
            case("downright"):
                actor.screenX += actor.movementSpeed; 
                actor.screenY += actor.movementSpeed; break;
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
    // Stores the actor's last 2 or 3 directions based on its movementType
    storeDirection(actor, previousDirections) {
        let amountToStore = actor.movementType === 1 ? 1 : 2;
        if (previousDirections.length > amountToStore) {
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
        const movementBoundaries = setMovementBoundaries(actor);
        return (
            actor.screenX >= movementBoundaries.x 
            || actor.screenX <= 2 
            || actor.screenY >= movementBoundaries.y 
            || actor.screenY <= 2
        );
    }
    // Pushes the actor away from the wall and moves it to a new direciton
    moveAwayFromWall(actor) {
        if (this.isActorAgainstWall(actor)) {
            const distanceToMove = 3;
            switch (actor.currentDirection) {
                case("left"):
                    actor.screenX += distanceToMove; break;
                case("right"):
                    actor.screenX -= distanceToMove; break;
                case("up"):
                    actor.screenY += distanceToMove; break;
                case("down"):
                    actor.screenY -= distanceToMove; break;
                case("upleft"):
                    actor.screenX += (distanceToMove / 2); 
                    actor.screenY += (distanceToMove / 2); break;
                case("upright"):
                    actor.screenX -= (distanceToMove / 2); 
                    actor.screenY += (distanceToMove / 2); break;
                case("downleft"):
                    actor.screenX += (distanceToMove / 2); 
                    actor.screenY -= (distanceToMove / 2); break;
                case("downright"):
                    actor.screenX -= (distanceToMove / 2); 
                    actor.screenY -= (distanceToMove / 2); break;
            }
            this.setRandomDirection(actor)
            this.setRandomWalkDistance(actor);
        }
    }
    moveRandomly(actor) {
        this.moveToRandomDirection(actor);
        this.moveAwayFromWall(actor);
    }
}
