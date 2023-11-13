export {ArtificialIntelligence};
import {RNG, cycleSprite} from "../helpers/globals.js";

class ArtificialIntelligence {
    constructor(game) {
        this.game = game
    };
    chasePlayer(actor) { // Grunts only
        if (actor.screenX > this.game.player.screenX) {
            actor.screenX -= actor.movementSpeed
        } else {
            actor.screenX += actor.movementSpeed
        };
        if (actor.screenY > this.game.player.screenY) {
            actor.screenY -= actor.movementSpeed
        } else {
            actor.screenY += actor.movementSpeed
        }
    };
    moveAtRandomIntervals(actor) { // Grunts only
        let randomNumber = RNG(1, 3);
        if (randomNumber === 1) {
            this.chasePlayer(actor);
            cycleSprite(actor, 20, 0)
        }
    };
    setRandomDirection(actor) {
        const fourDirections = ["left", "right", "up", "down"];
        const eightDirections = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
        if (actor.movementType == 1) {
            return fourDirections[Math.floor(Math.random() * fourDirections.length)]
        };
        return eightDirections[Math.floor(Math.random() * eightDirections.length)]
    };
    setRandomWalkDistance() {
        const distances = [16, 18, 20, 22, 25, 30, 35, 40];
        return distances[Math.floor(Math.random() * distances.length)]
    };
    // Moves to a random direction for a random distance
    moveToRandomDirection(actor) {
        if (actor.remainingWalkingDistance > 0) {
            switch(actor.currentDirection) {
                case("left"):
                    actor.screenX -= actor.movementSpeed; break
                case("right"):
                    actor.screenX += actor.movementSpeed; break
                case("up"):
                    actor.screenY -= actor.movementSpeed; break
                case("down"):
                    actor.screenY += actor.movementSpeed; break
                case("upleft"):
                    actor.screenY -= actor.movementSpeed;
                    actor.screenX -= actor.movementSpeed; break
                case("upright"):
                    actor.screenY -= actor.movementSpeed;
                    actor.screenX += actor.movementSpeed; break
                case("downleft"):
                    actor.screenY += actor.movementSpeed;
                    actor.screenX -= actor.movementSpeed; break
                case("downright"):
                    actor.screenY += actor.movementSpeed;
                    actor.screenX += actor.movementSpeed; break
            }
            actor.remainingWalkingDistance--
        } else {
            actor.currentDirection = this.setRandomDirection(actor);
            actor.remainingWalkingDistance = this.setRandomWalkDistance();
        }
    };
    isActorAgainstWall(actor) {
        const movementBoundaries = actor.setMovementBoundaries();
        if (actor.screenX >= movementBoundaries["x"] 
            || actor.screenX <= 2 
            || actor.screenY >= movementBoundaries["y"] 
            || actor.screenY <= 2) {
                return true
        };
        return false
    };
    moveAwayFromWall(actor) {
        if (this.isActorAgainstWall(actor)) {
            actor.currentDirection = this.setRandomDirection(actor)
        }
    };
    moveRandomly(actor) {
        this.moveToRandomDirection(actor);
        this.moveAwayFromWall(actor)
    }
}