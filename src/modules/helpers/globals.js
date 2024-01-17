export {RNG, typeOfActor, canMove, getDistance};

// Generates a random number between (and including) min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function typeOfActor(actor, type) {
    return actor.constructor.name === type;
}
function canMove(actor) {
    return actor.game.globalTimer % actor.movementAnimationDelay === 0;
}
// Returns the distance between two actors
function getDistance(actorA, actorB) {
    const distanceX = actorB.screenX - actorA.screenX;
    const distanceY = actorB.screenY - actorA.screenY;
    return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
}
