export {RNG, cycleSprite, getDistance, canMove};

// Generates a random number between (and including) min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function notEndOfSheet(actor, maxSpritesheetX) {
    return actor.spritesheetX < maxSpritesheetX;
}
function nextSprite(actor) {
    const initialSpritesheetX = 0;
    const maxSpritesheetX = (actor.sprites.width - actor.width);
    if (notEndOfSheet(actor, maxSpritesheetX)) {
        actor.spritesheetX += actor.spritesheetIncrement;
        return;
    }
    actor.spritesheetX = initialSpritesheetX;
}
function isPlayer(actor) {
    return actor.constructor.name === "Player";
}
function canMove(actor) {
    return actor.game.globalTimer % actor.movementAnimationDelay === 0;
}
function nextPlayerSprite(player) {
    if (canMove(player)) { // Unrelated to the ability to move in this specific case
        nextSprite(player);
    }
}
function cycleSprite(actor, spritesheetY) {
    if (spritesheetY !== null) {
        actor.spritesheetY = spritesheetY;
    }
    if (isPlayer(actor)) {
        nextPlayerSprite(actor);
    }
    else {
        nextSprite(actor);
    }
}
// Returns the distance between two actors
function getDistance(actorA, actorB) {
    const distanceX = actorB.screenX - actorA.screenX;
    const distanceY = actorB.screenY - actorA.screenY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
