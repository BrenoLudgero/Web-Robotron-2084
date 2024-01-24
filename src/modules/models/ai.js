export {ArtificialIntelligence};
import {RNG, getDistanceBetween} from "../helpers/globals.js";

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
            // game.soundMngr.playSound("gruntStep", 1);
            game.spriteMngr.nextSprite(grunt);
        }
    }
    // Spheroids and Enforcers only
    moveInRelationToPlayer(actor, game, closer = false) {
        const {player} = game.actorMngr.actors;
        const distanceX = player.screenX - actor.screenX;
        const distanceY = player.screenY - actor.screenY;
        const distance = getDistanceBetween(actor, player); // Ranges from 40 to 1092
        const distanceToKeep = actor.minDistanceFromPlayer;
        // Adjusts movement speed based on distance
        const speedMultiplier = closer ? distance / distanceToKeep : distanceToKeep / distance;
        const effectiveSpeed = actor.movementSpeed * speedMultiplier;
        const movementMultiplier = effectiveSpeed / distance;
        actor.screenX += (closer ? distanceX : -distanceX) * movementMultiplier;
        actor.screenY += (closer ? distanceY : -distanceY) * movementMultiplier;
        // Spheroid rotates clockwise in relation to the Player if closer than distanceToKeep
        if (!closer && distance <= distanceToKeep) {
            actor.screenX += distanceY * movementMultiplier;
            actor.screenY -= distanceX * movementMultiplier;
        }
        actor.stayWithinCanvas(); // Might leave canvas' borders if in actor.update
    }
    moveActor(actor) {
        const reducedMovementSpeed = actor.movementSpeed * 0.8;
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
                actor.screenY -= reducedMovementSpeed; 
                actor.screenX -= reducedMovementSpeed; break;
            case("upright"):
                actor.screenX += reducedMovementSpeed; 
                actor.screenY -= reducedMovementSpeed; break;
            case("downleft"):
                actor.screenX -= reducedMovementSpeed; 
                actor.screenY += reducedMovementSpeed; break;
            case("downright"):
                actor.screenX += reducedMovementSpeed; 
                actor.screenY += reducedMovementSpeed; break;
        }
        actor.remainingWalkingDistance--;
    }
    setRandomWalkDistance(actor, extended = false) {
        let minDistance, maxDistance;
        if (extended) {
            minDistance = 60;
            maxDistance = 120;
        }
        else {
            minDistance = 16;
            maxDistance = 50;
        }
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
    moveToRandomDirection(actor, extended) {
        if (actor.remainingWalkingDistance > 0) {
            this.moveActor(actor);
        } else {
            this.setRandomWalkDistance(actor, extended);
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
    moveAwayFromWall(actor, extended) {
        if (this.isActorAgainstWall(actor)) {
            this.setRandomDirection(actor);
            this.setRandomWalkDistance(actor, extended);
        }
    }
    moveRandomly(actor, extended) {
        this.moveAwayFromWall(actor, extended);
        this.moveToRandomDirection(actor, extended);
        actor.stayWithinCanvas();
    }
}
