export {ActorManager};
import {RNG} from "../helpers/globals.js";
import {Grunt} from "../actors/enemies/grunt.js";
import {Hulk} from "../actors/enemies/hulk.js";
import {Mommy} from "../actors/humans/mommy.js";
import {calculateDistance} from "../helpers/globals.js"

class ActorManager {
    constructor(game) {
        this.game = game
    };
    update(enemies, humans) {
        this.game.player.update();
        if (this.game.debuggerr.shouldUpdateActors) {
            this.updateActors(enemies);
            this.updateActors(humans);
            this.removeDeadOrRescuedActors(enemies, humans)
        }
    };
    draw(enemies, humans, context) {
        this.drawActors(enemies, context);
        this.drawActors(humans, context)
    };
    // Checks if actor is safe from every other actor by comparing distances
    isSafeFromOtherActors(actor, actors, minDistance) {
        return actors.every(otherActor => {
            return calculateDistance(actor, otherActor) >= minDistance
        })
    };
    // REFACTOR
    isSafeToSpawnEnemy(newEnemy, maxScreenX, maxScreenY, game) {
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newEnemy.screenX = RNG(1, maxScreenX);
            newEnemy.screenY = RNG(1, maxScreenY);
            let playerDistance = calculateDistance(newEnemy, game.player);
            let isSafeFromPlayer = playerDistance >= newEnemy.minPlayerSpawnDistance;
            let isSafeFromHumans = this.isSafeFromOtherActors(newEnemy, game.humans, newEnemy.minHumanSpawnDistance);
            let isSafeFromEnemies = this.isSafeFromOtherActors(newEnemy, game.enemies, newEnemy.minEnemySpawnDistance);
            if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                isSafeToSpawn = true
            }
        }
        return isSafeToSpawn
    };
    // REFACTOR
    isSafeToSpawnHuman(newHuman, maxScreenX, maxScreenY, game) {
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newHuman.screenX = RNG(1, maxScreenX);
            newHuman.screenY = RNG(1, maxScreenY);
            let playerDistance = calculateDistance(newHuman, game.player);
            let isSafeFromPlayer = playerDistance >= newHuman.minPlayerSpawnDistance;
            let isSafeFromHumans = this.isSafeFromOtherActors(newHuman, game.humans, newHuman.minHumanSpawnDistance);
            if (isSafeFromPlayer && isSafeFromHumans) {
                isSafeToSpawn = true
            }
        }
        return isSafeToSpawn
    };
    // REFACTOR
    addEnemies(numberEnemies, enemyType) {
        const {game} = this;
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(game);
            let maxScreenX = game.canvas.width - newEnemy.width;
            let maxScreenY = game.canvas.height - newEnemy.height;
            if (this.isSafeToSpawnEnemy(newEnemy, maxScreenX, maxScreenY, game)) {
                game.enemies.push(newEnemy)
            }
        }
    };
    // REFACTOR
    addHumans(numberHumans, humanType) {
        const {game} = this;
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(game);
            let maxScreenX = game.canvas.width - newHuman.width;
            let maxScreenY = game.canvas.height - newHuman.height;
            if (this.isSafeToSpawnHuman(newHuman, maxScreenX, maxScreenY, game)) {
                game.humans.push(newHuman)
            }
        }
    };
    spawnActors() { // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
        this.addHumans(8, Mommy);
        this.addEnemies(5, Hulk);
        this.addEnemies(15, Grunt)
    };
    drawActors(actors, context) {
        this.game.player.draw(context);
        actors.forEach(actor => {
            actor.draw(context);
            this.game.debuggerr.drawHitboxes(actor, context)
        })
    };
    updateActors(actors) {
        actors.forEach(actor => {
            actor.update()
        })
    };
    removeDeadOrRescuedActors(enemies, humans) {
        enemies.splice(0, enemies.length, ...enemies.filter(enemy => enemy.isAlive));
        humans.splice(0, humans.length, ...humans.filter(human => human.isAlive && !human.wasRescued))
    }
}