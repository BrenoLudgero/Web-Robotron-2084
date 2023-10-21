export {RNG, spriteCycle, setMovementBoundaries}

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
}
