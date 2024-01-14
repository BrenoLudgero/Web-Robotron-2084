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
function notEndOfSheet(actor, maxSpritesheetX) {
    return actor.spritesheetX < maxSpritesheetX;
}
function spriteCycle(actor) {
    const initialSpritesheetX = 0;
    const maxSpritesheetX = (actor.sprites.width - actor.width);
    if (notEndOfSheet(actor, maxSpritesheetX)) {
        actor.spritesheetX += actor.spritesheetIncrement;
        return;
    }
    actor.spritesheetX = initialSpritesheetX;
}
function canMove(actor) {
    return actor.game.globalTimer % actor.movementAnimationDelay === 0;
}
function shouldCyclePlayer(player) {
    return canMove(player);
}
function isPlayer(actor) {
    return actor.constructor.name === "Player";
}
function playerSpriteCycle(player) {
    if (shouldCyclePlayer(player)) {
        spriteCycle(player);
    }
}
function cycleSprite(actor, spritesheetY) {
    if (spritesheetY !== null) {
        actor.spritesheetY = spritesheetY;
    }
    if (isPlayer(actor)) {
        playerSpriteCycle(actor);
    }
    else {
        spriteCycle(actor);
    }
}
// Returns the distance between two actors
function getDistance(actorA, actorB) {
    const distanceX = actorB.screenX - actorA.screenX;
    const distanceY = actorB.screenY - actorA.screenY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
