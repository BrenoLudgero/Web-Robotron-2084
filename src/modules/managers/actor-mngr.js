export {ActorManager};
import {Player} from "../actors/player.js";
import {RNG, getDistanceBetween} from "../helpers/globals.js"

class ActorManager {
    constructor(game) {
        this.game = game;
        this.actors = {
            player: new Player(game),
            enemies: new Set(),
            humans: new Set()
        }
    }
    update() {
        const {player, enemies, humans} = this.actors;
        const debuggerr = this.game.debuggerr;
        if (debuggerr.shouldUpdateActors) {
            this.updateActors(enemies);
            this.updateActors(humans);
            this.deleteDestroyedOrRescued(enemies, humans);
        }
        player.update();
    }
    draw(context) {
        const {player, enemies, humans} = this.actors;
        this.drawActors(enemies, context);
        this.drawActors(humans, context);
        player.draw(context);
    }
    awayFromOthers(actor, otherActors, minDistance) {
        let away = true;
        otherActors.forEach(otherActor => {
            if (getDistanceBetween(actor, otherActor) < minDistance) {
                away = false;
            }
        });
        return away;
    }
    setRandomScreenPosition(newActor) {
        const minimumX = 3;
        const minimumY = 3;
        newActor.screenX = RNG(minimumX, newActor.movementBoundaries.x);
        newActor.screenY = RNG(minimumY, newActor.movementBoundaries.y);
    }
    // Checks if the newActor is at a sufficient distance from other actors before spawning
    safeToSpawn(newActor) {
        const {player, enemies, humans} = this.actors;
        const {minPlayerSpawnDistance, minHumanSpawnDistance, minEnemySpawnDistance} = newActor;
        let safeToSpawn = false;
        while (!safeToSpawn) {
            this.setRandomScreenPosition(newActor);
            let playerDistance = getDistanceBetween(newActor, player);
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
                this.actors.humans.add(newActor); break;
            case("Enemy"):
                this.actors.enemies.add(newActor); break;
            case("Obstacle"):
                this.actors.obtacles.add(newActor); break;
        }
    }
    addActors(numberActors, actorType) {
        for (let i = 0; i < numberActors; i++) {
            const newActor = new actorType(this.game);
            if (this.safeToSpawn(newActor)) {
                this.addActor(newActor, actorType);
            }
        }
    }
    updateActors(actors) {
        actors.forEach(actor => {
            actor.update(this.game);
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
