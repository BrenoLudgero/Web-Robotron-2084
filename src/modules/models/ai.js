export {ArtificialIntelligence};
import {RNG, cycleSprite, setMovementBoundaries} from "../helpers/globals.js";

class ArtificialIntelligence {
    constructor(game) {
        this.game = game;
        this.directions = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
        this.previousDirections = [];
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
    // Returns a new walkDistance with a guaranteed longer walk when moving away from a wall
    setRandomWalkDistance(actor, avoidingWall) {
        const minDistance = avoidingWall ? 32 : 16;
        const maxDistance = 55;
        actor.remainingWalkingDistance = RNG(minDistance, maxDistance);
    }
    // Returns one of 4 or 8 directions based on the actor's movementType if not in previousDirections
    getRandomDirection(actor) {
        const numDirections = (actor.movementType === 1 ? 4 : 8);
        let newDirection;
        do {
            newDirection = this.directions[Math.floor(Math.random() * numDirections)];
        } while (this.previousDirections.includes(newDirection));
        return newDirection;
    }
    // Stores the actor's last 2 or 3 directions based on the its movementType
    storeDirection(actor) {
        let amount = actor.movementType === 1 ? 1 : 2;
        if (this.previousDirections.length > amount) {
            this.previousDirections.shift();
        }
        this.previousDirections.push(actor.currentDirection);
    }
    setRandomDirection(actor) {
        actor.currentDirection = this.getRandomDirection(actor);
        this.storeDirection(actor);
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
            const distanceToMove = 4;
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
            this.setRandomWalkDistance(actor, true);
        }
    }
    moveRandomly(actor) {
        this.moveToRandomDirection(actor);
        this.moveAwayFromWall(actor);
    }
}
