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
    isAwayFromOtherActors(actor, otherActors, minDistance) {
        let isAway = true;
        otherActors.forEach(otherActor => {
            if (getDistance(actor, otherActor) < minDistance) {
                isAway = false;
            }
        });
        return isAway;
    }
    // Checks if the newActor is at a sufficient distance from other actors before spawning
    isSafeToSpawnActor(newActor, maxScreenX, maxScreenY) {
        const {player, enemies, humans} = this;
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newActor.screenX = RNG(1, maxScreenX);
            newActor.screenY = RNG(1, maxScreenY);
            let playerDistance = getDistance(newActor, player);
            let isAwayFromPlayer = playerDistance >= newActor.minPlayerSpawnDistance;
            let isAwayFromHumans = this.isAwayFromOtherActors(newActor, humans, newActor.minHumanSpawnDistance);
            let isAwayFromEnemies = this.isAwayFromOtherActors(newActor, enemies, newActor.minEnemySpawnDistance);
            isSafeToSpawn = (isAwayFromPlayer && isAwayFromEnemies && isAwayFromHumans);
        }
        return isSafeToSpawn;
    }
    addEnemies(game, numberEnemies, enemyType, spritesIndex) {
        const ui = game.ui;
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(game, spritesIndex);
            let maxScreenX = ui.canvas.width - newEnemy.width;
            let maxScreenY = ui.canvas.height - newEnemy.height;
            if (this.isSafeToSpawnActor(newEnemy, maxScreenX, maxScreenY)) {
                this.enemies.add(newEnemy);
            }
        }
    }
    addHumans(game, numberHumans, humanType, spritesIndex) {
        const ui = game.ui;
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(game, spritesIndex);
            let maxScreenX = ui.canvas.width - newHuman.width;
            let maxScreenY = ui.canvas.height - newHuman.height;
            if (this.isSafeToSpawnActor(newHuman, maxScreenX, maxScreenY)) {
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
            if (!enemy.isAlive) {
                enemies.delete(enemy);
            }
        });
        humans.forEach(human => {
            if (!human.isAlive || human.wasRescued) {
                humans.delete(human);
            }
        });
    }
}
