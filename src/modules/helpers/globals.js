export {RNG, setHitbox, cycleSprite, getDistance};

// Generates a random number between (and including) min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setHitbox(actor, widthSubtraction, heightSubtraction, xOffset, yOffset) {
    actor.hitboxWidth = actor.width - widthSubtraction;
    actor.hitboxHeight = actor.height - heightSubtraction;
    actor.hitboxXOffset = xOffset;
    actor.hitboxYOffset = yOffset;
}
function cycleSprite(actor, increment, spritesheetY) {
    const initialSpritesheetX = 0;
    const maxSpritesheetX = (actor.sprites.width - actor.width);
    actor.spritesheetY = spritesheetY;
    if (actor.spritesheetX < maxSpritesheetX) {
        actor.spritesheetX += increment;
        return;
    }
    actor.spritesheetX = initialSpritesheetX;
}
// Returns the distance between two actors
function getDistance(actorA, actorB) {
    const distanceX = actorB.screenX - actorA.screenX;
    const distanceY = actorB.screenY - actorA.screenY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
