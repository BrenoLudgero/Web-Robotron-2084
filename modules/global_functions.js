export {RNG, cycleSprite};

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1
};
function cycleSprite(actor, increment, spritesheetYPosition) {
    const initialSpritesheetXPosition = 0;
    const maxSpritesheetXPosition = (actor.sprites.width - actor.width);
    actor.spritesheetYPosition = spritesheetYPosition;
    if (actor.spritesheetXPosition < maxSpritesheetXPosition) {
        actor.spritesheetXPosition += increment;
        return
    }
    actor.spritesheetXPosition = initialSpritesheetXPosition
}
