export {RNG, isActorOfType, canAnimate, getDistanceBetween};

// Generates a random integer between (and including) min and max
function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isActorOfType(actor, type) {
    return actor.constructor.name === type;
}
function canAnimate(actor) {
    return actor.game.globalTimer % actor.animationDelay === 0;
}
function getDistanceBetween(actorA, actorB) {
    const distanceX = actorB.screenX - actorA.screenX;
    const distanceY = actorB.screenY - actorA.screenY;
    return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
}
