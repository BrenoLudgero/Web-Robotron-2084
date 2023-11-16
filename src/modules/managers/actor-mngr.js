export {ActorManager};
import {Grunt} from "../actors/enemies/grunt.js";
import {Hulk} from "../actors/enemies/hulk.js";
import {Mommy} from "../actors/humans/mommy.js";
import {RNG, calculateDistance} from "../helpers/globals.js"

class ActorManager {
    constructor(game) {
        this.game = game
    };
    update(enemies, humans) {
        this.game.player.update();
        if (this.game.debuggerr.shouldUpdateActors) {
            this.updateActors(enemies);
            this.updateActors(humans);
            this.removeDeadOrRescued(enemies, humans)
        }
    };
    draw(context) {
        this.game.player.draw(context);
        this.drawActors(this.game.enemies, context);
        this.drawActors(this.game.humans, context)
    };
    // Checks if actor is in a safe distance from other actors before spawning
    isSafeFromOtherActors(actor, otherActors, minDistance) {
        return otherActors.every(otherActor => {
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
            let maxScreenX = game.ui.canvas.width - newEnemy.width;
            let maxScreenY = game.ui.canvas.height - newEnemy.height;
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
            let maxScreenX = game.ui.canvas.width - newHuman.width;
            let maxScreenY = game.ui.canvas.height - newHuman.height;
            if (this.isSafeToSpawnHuman(newHuman, maxScreenX, maxScreenY, game)) {
                game.humans.push(newHuman)
            }
        }
    };
    // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
    spawnActors() {
        this.addHumans(8, Mommy);
        this.addEnemies(5, Hulk);
        this.addEnemies(15, Grunt)
    };
    drawActors(actors, context) {
        actors.forEach(actor => {
            actor.draw(context)
        })
    };
    updateActors(actors) {
        actors.forEach(actor => {
            actor.update()
        })
    };
    removeDeadOrRescued(enemies, humans) {
        enemies.splice(0, enemies.length, ...enemies.filter(enemy => enemy.isAlive));
        humans.splice(0, humans.length, ...humans.filter(human => human.isAlive && !human.wasRescued))
    }
}