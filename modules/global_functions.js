export {RNG, cycleSprite};

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1
};
function cycleSprite(actor, initialSpritesheetXPosition, increment, maxSpritesheetXPosition, spritesheetYPosition) {
    actor.spritesheetYPosition = spritesheetYPosition;
    if (actor.spritesheetXPosition < maxSpritesheetXPosition) {
        actor.spritesheetXPosition += increment
    } else {
        actor.spritesheetXPosition = initialSpritesheetXPosition
    }
}
