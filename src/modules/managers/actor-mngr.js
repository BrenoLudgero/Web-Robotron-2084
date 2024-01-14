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
            this.removeDestroyedOrRescued(enemies, humans);
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
    addEnemies(game, numberEnemies, enemyType, spritesIndex) {
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(game, spritesIndex);
            if (this.safeToSpawn(newEnemy)) {
                this.enemies.add(newEnemy);
            }
        }
    }
    addHumans(game, numberHumans, humanType, spritesIndex) {
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(game, spritesIndex);
            if (this.safeToSpawn(newHuman)) {
                this.humans.add(newHuman);
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
    removeDestroyedOrRescued(enemies, humans) {
        enemies.forEach(enemy => {
            if (!enemy.alive) {
                enemies.delete(enemy);
            }
        });
        humans.forEach(human => {
            if (!human.alive || human.rescued) {
                humans.delete(human);
            }
        });
    }
}
