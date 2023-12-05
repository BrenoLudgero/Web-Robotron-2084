export {ActorManager};
import {Grunt} from "../actors/enemies/grunt.js";
import {Hulk} from "../actors/enemies/hulk.js";
import {Mommy} from "../actors/humans/mommy.js";
import {RNG, calculateDistance} from "../helpers/globals.js"

class ActorManager {
    constructor(game) {
        this.game = game;
    }
    update() {
        const {game} = this;
        game.player.update();
        if (this.game.debuggerr.shouldUpdateActors) {
            this.updateActors(game.enemies);
            this.updateActors(game.humans);
            this.removeDestroyedOrRescued(game.enemies, game.humans);
        }
    }
    draw(context) {
        this.game.player.draw(context);
        this.drawActors(this.game.enemies, context);
        this.drawActors(this.game.humans, context);
    }
    isAwayFromOtherActors(actor, otherActors, minDistance) {
        let isAway = true;
        otherActors.forEach(otherActor => {
            if (calculateDistance(actor, otherActor) < minDistance) {
                isAway = false;
            }
        });
        return isAway;
    }
    // Checks if the newActor is at a sufficient distance from other actors before spawning
    isSafeToSpawnActor(newActor, maxScreenX, maxScreenY) {
        const {game} = this;
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newActor.screenX = RNG(1, maxScreenX);
            newActor.screenY = RNG(1, maxScreenY);
            let playerDistance = calculateDistance(newActor, game.player);
            let isAwayFromPlayer = playerDistance >= newActor.minPlayerSpawnDistance;
            let isAwayFromHumans = this.isAwayFromOtherActors(newActor, game.humans, newActor.minHumanSpawnDistance);
            let isAwayFromEnemies = this.isAwayFromOtherActors(newActor, game.enemies, newActor.minEnemySpawnDistance);
            if (isAwayFromPlayer && isAwayFromEnemies && isAwayFromHumans) {
                isSafeToSpawn = true;
            }
        }
        return isSafeToSpawn;
    }
    addEnemies(numberEnemies, enemyType) {
        const {game} = this;
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(game);
            let maxScreenX = game.uiMngr.canvas.width - newEnemy.width;
            let maxScreenY = game.uiMngr.canvas.height - newEnemy.height;
            if (this.isSafeToSpawnActor(newEnemy, maxScreenX, maxScreenY)) {
                game.enemies.add(newEnemy);
            }
        }
    }
    addHumans(numberHumans, humanType) {
        const {game} = this;
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(game);
            let maxScreenX = game.uiMngr.canvas.width - newHuman.width;
            let maxScreenY = game.uiMngr.canvas.height - newHuman.height;
            if (this.isSafeToSpawnActor(newHuman, maxScreenX, maxScreenY)) {
                game.humans.add(newHuman);
            }
        }
    }
    // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
    spawnActors() {
        this.addHumans(15, Mommy);
        this.addEnemies(5, Hulk);
        this.addEnemies(10, Grunt);
    }
    drawActors(actors, context) {
        actors.forEach(actor => {
            actor.draw(context);
        });
    }
    updateActors(actors) {
        actors.forEach(actor => {
            actor.update();
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
