export {RNG, setHitbox, cycleSprite, calculateDistance, setMovementBoundaries};

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
function calculateDistance(actor1, actor2) {
    const distanceX = actor2.screenX - actor1.screenX;
    const distanceY = actor2.screenY - actor1.screenY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
// Makes sure actors stay within canvas borders
function setMovementBoundaries(actor) {
    const movementBoundaries = {
        "x": actor.game.ui.canvas.width - actor.width,
        "y": actor.game.ui.canvas.height - actor.height
    };
    if (actor.screenY <= 2) {
        actor.screenY = 2;
    } else if (actor.screenY >= movementBoundaries.y) {
        actor.screenY = movementBoundaries.y;
    }
    if (actor.screenX <= 2) {
        actor.screenX = 2;
    } else if (actor.screenX >= movementBoundaries.x) {
        actor.screenX = movementBoundaries.x;
    }
    return movementBoundaries;
}
