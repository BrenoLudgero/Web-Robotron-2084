export {RNG, typeOfActor, canMove, cycleSprite, getDistance};

// Generates a random number between (and including) min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function notEndOfSheet(actor, maxSpritesheetX) {
    return actor.spritesheetX < maxSpritesheetX;
}
function nextSprite(actor) {
    const initialSpritesheetX = 0;
    const maxSpritesheetX = actor.sprites.spritesheet.width - actor.width;
    if (notEndOfSheet(actor, maxSpritesheetX)) {
        actor.spritesheetX += actor.spritesheetIncrement;
        return;
    }
    actor.spritesheetX = initialSpritesheetX;
}
function typeOfActor(actor, type) {
    return actor.constructor.name === type;
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
    if (spritesheetY != undefined) {
        actor.spritesheetY = spritesheetY;
    }
    if (typeOfActor(actor, "Player")) {
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
    return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
}
