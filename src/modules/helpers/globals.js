export {RNG, cycleSprite, calculateDistance};

// Generates a random number between min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + 1
};
function cycleSprite(actor, increment, spritesheetY) {
    const initialSpritesheetX = 0;
    const maxSpritesheetX = (actor.sprites.width - actor.width);
    actor.spritesheetY = spritesheetY;
    if (actor.spritesheetX < maxSpritesheetX) {
        actor.spritesheetX += increment;
        return
    }
    actor.spritesheetX = initialSpritesheetX
};
function calculateDistance(actor1, actor2) {
    const distanceX = actor2.screenX - actor1.screenX;
    const distanceY = actor2.screenY - actor1.screenY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
}
