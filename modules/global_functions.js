export {RNG, spriteCycle, setMovementBoundaries, setRandomDirection, walkRandomly, isActorAgainstWall, turnAwayFromWall};

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1
};
function spriteCycle(actor, initialSpritesheetXPosition, increment, maxSpritesheetXPosition, spritesheetYPosition) {
    actor.spritesheetYPosition = spritesheetYPosition;
    if (actor.spritesheetXPosition < maxSpritesheetXPosition) {
        actor.spritesheetXPosition += increment
    } else {
        actor.spritesheetXPosition = initialSpritesheetXPosition
    }
};
function setMovementBoundaries(actor, maxScreenXPosition, maxScreenYPosition) {
    if (actor.screenYPosition <= 1) {
        actor.screenYPosition = 1
    } else if (actor.screenYPosition >= maxScreenYPosition) {
        actor.screenYPosition = maxScreenYPosition
    };
    if (actor.screenXPosition <= 1) {
        actor.screenXPosition = 1
    } else if (actor.screenXPosition >= maxScreenXPosition) {
        actor.screenXPosition = maxScreenXPosition
    }
};
function setRandomDirection(actor) {
    const fourDirections = ["left", "right", "up", "down"];
    const eightDirections = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
    if (actor.movementType == 1) {
        return fourDirections[Math.floor(Math.random() * fourDirections.length)]
    } else if (actor.movementType == 2) {
        return eightDirections[Math.floor(Math.random() * eightDirections.length)]
    }
};
function setRandomWalkDistance() {
    const distances = [500, 650, 800];
    return distances[Math.floor(Math.random() * distances.length)]
};
function walkRandomly(actor) {
    if (actor.remainingWalkingDistance > 0) {
        switch(actor.currentDirection) {
            case("left"):
                actor.screenXPosition -= actor.movementSpeed
                break
            case("right"):
                actor.screenXPosition += actor.movementSpeed
                break;
            case("up"):
                actor.screenYPosition -= actor.movementSpeed
                break
            case("down"):
                actor.screenYPosition += actor.movementSpeed
                break
            case("upleft"):
                actor.screenYPosition -= actor.movementSpeed,
                actor.screenXPosition -= actor.movementSpeed
                break
            case("upright"):
                actor.screenYPosition -= actor.movementSpeed,
                actor.screenXPosition += actor.movementSpeed
                break
            case("downleft"):
                actor.screenYPosition += actor.movementSpeed,
                actor.screenXPosition -= actor.movementSpeed
                break
            case("downright"):
                actor.screenYPosition += actor.movementSpeed,
                actor.screenXPosition += actor.movementSpeed
                break
        }
        actor.remainingWalkingDistance -= actor.movementRate
    } else {
        actor.currentDirection = setRandomDirection(actor);
        actor.remainingWalkingDistance = setRandomWalkDistance();
    }
};
function isActorAgainstWall(actor) {
    if (actor.screenXPosition >= actor.playableArea["x"] ||
        actor.screenXPosition <= 5 ||
        actor.screenYPosition >= actor.playableArea["y"] ||
        actor.screenYPosition <= 2) {
            return true
    }
};
function turnAwayFromWall(actor) {
    if (isActorAgainstWall(actor)) {
        switch(actor.currentDirection) {
            case("left"):
                actor.currentDirection = "right"
                break
            case("right"):
                actor.currentDirection = "left"
                break;
            case("up"):
                actor.currentDirection = "down"
                break
            case("down"):
                actor.currentDirection = "up"
                break
            case("upleft"):
                actor.currentDirection = "downright"
                break
            case("upright"):
                actor.currentDirection = "downleft"
                break
            case("downleft"):
                actor.currentDirection = "upright"
                break
            case("downright"):
                actor.currentDirection = "upleft"
                break
        }
    }
}
