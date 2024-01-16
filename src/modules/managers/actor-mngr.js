export {ActorManager};
import {Player} from "../actors/player.js";
import {RNG, getDistance} from "../helpers/globals.js"

class ActorManager {
    constructor(game, spritesIndex) {
        this.player = new Player(game, spritesIndex);
        this.enemies = new Set();
        this.humans = new Set();
    }
    update(game) {
        const {enemies, humans, player} = this;
        const debuggerr = game.debuggerr;
        player.update();
        if (debuggerr.shouldUpdateActors) {
            this.updateActors(enemies, game);
            this.updateActors(humans, game);
            this.deleteDestroyedOrRescued(enemies, humans);
        }
    }
    draw(context) {
        const {player, enemies, humans} = this;
        player.draw(context);
        this.drawActors(enemies, context);
        this.drawActors(humans, context);
    }
    awayFromOthers(actor, otherActors, minDistance) {
        let away = true;
        otherActors.forEach(otherActor => {
            if (getDistance(actor, otherActor) < minDistance) {
                away = false;
            }
        });
        return away;
    }
    setRandomScreenPosition(newActor) {
        newActor.screenX = RNG(3, newActor.movementBoundaries.x);
        newActor.screenY = RNG(3, newActor.movementBoundaries.y);
    }
    // Checks if the newActor is at a sufficient distance from other actors before spawning
    safeToSpawn(newActor) {
        const {player, enemies, humans} = this;
        const {minPlayerSpawnDistance, minHumanSpawnDistance, minEnemySpawnDistance} = newActor;
        let safeToSpawn = false;
        while (!safeToSpawn) {
            this.setRandomScreenPosition(newActor);
            let playerDistance = getDistance(newActor, player);
            let awayFromPlayer = playerDistance >= minPlayerSpawnDistance;
            let awayFromHumans = this.awayFromOthers(newActor, humans, minHumanSpawnDistance);
            let awayFromEnemies = this.awayFromOthers(newActor, enemies, minEnemySpawnDistance);
            safeToSpawn = (awayFromPlayer && awayFromEnemies && awayFromHumans);
        }
        return safeToSpawn;
    }
    getParentClass(actorType) {
        return Object.getPrototypeOf(actorType).name;
    }
    addActor(newActor, actorType) {
        const type = this.getParentClass(actorType);
        switch(type) {
            case("Human"):
                this.humans.add(newActor); break;
            case("Enemy"):
                this.enemies.add(newActor); break;
            case("Obstacle"):
                this.obtacles.add(newActor); break;
        }
    }
    addActors(game, numberActors, actorType, spritesIndex) {
        for (let i = 0; i < numberActors; i++) {
            const newActor = new actorType(game, spritesIndex);
            if (this.safeToSpawn(newActor)) {
                this.addActor(newActor, actorType);
            }
        }
    }
    updateActors(actors, game) {
        actors.forEach(actor => {
            actor.update(game);
        });
    }
    drawActors(actors, context) {
        actors.forEach(actor => {
            actor.draw(context);
        });
    }
    wasDestroyed(actor) {
        return actor.currentState === "destroyed";
    }
    wasRescued(human) {
        return human.currentState === "rescued";
    }
    deleteActors(actors) {
        actors.forEach(actor => {
            if (this.wasDestroyed(actor) || this.wasRescued(actor)) {
                actors.delete(actor);
            }
        });
    }
    deleteDestroyedOrRescued(enemies, humans) {
        this.deleteActors(enemies);
        this.deleteActors(humans);
    }
}
