export {Game};
import {RNG} from "./global_functions.js";
import {Player} from "./player.js";
import {Enemy} from "./models/enemy.js";
import {Human} from "./models/human.js";
import {Mommy} from "./humans/mommy.js";
import {Grunt} from "./enemies/grunt.js";
import {Hulk} from "./enemies/hulk.js";
import {InputManager} from "./managers/input_manager.js";
import {CollisionManager} from "./managers/collision_manager.js";
import {Debugger} from "./debugger.js";

class Game {
    constructor(canvas, context) {
        this.ctx = context;
        this.canvas = canvas;
        this.canvas.width;
        this.canvas.height;
        this.setCanvasScaledResolution(3);
        this.globalCounter = 0;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.enemies = [];
        this.human = new Human(this);
        this.humans = [];
        this.input = new InputManager(this);
        this.keysPressed = [];
        this.collision = new CollisionManager(this);
        this.debuggerr = new Debugger(this)
    };
    update() {
        if (this.player.isAlive) {
            this.player.update();
            if (this.debuggerr.shouldUpdateActors) {
                this.updateActors(this.enemies);
                this.updateActors(this.humans)
            }
            this.collision.update();
            this.removeDeadOrRescuedActors()
        }
    };
    draw(context) {
        this.player.draw(context);
        this.drawActors(this.enemies, context);
        this.drawActors(this.humans, context)
    };
    setCanvasScaledResolution(scaleFactor) {
        const originalWidth = 292;
        const originalHeight = 240;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.canvas.width = Math.round(originalWidth * scaleFactor);
        this.canvas.height = newHeight
    };
    drawActors(actors, context) {
        actors.forEach(actor => {
            actor.draw(context);
            this.debuggerr.drawHitboxes(actor, context)
        })
    };
    updateActors(actors) {
        actors.forEach(actor => {
            actor.update()
        })
    };
    calculateDistance(actor1, actor2) {
        const distanceX = actor2.screenXPosition - actor1.screenXPosition;
        const distanceY = actor2.screenYPosition - actor1.screenYPosition;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    };
    isSafeFromOtherActors(actor, actors, minDistance) {
        for (let j = 0; j < actors.length; j++) {
            const otherActor = actors[j];
            const distanceBetweenActors = this.calculateDistance(actor, otherActor);
            if (distanceBetweenActors <= minDistance) {
                return false
            }
        }
        return true
    };
    isSafeToSpawnEnemy(newEnemy, maxScreenXPosition, maxScreenYPosition) {
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newEnemy.screenXPosition = RNG(1, maxScreenXPosition);
            newEnemy.screenYPosition = RNG(1, maxScreenYPosition);
            let playerDistance = this.calculateDistance(newEnemy, this.player);
            let isSafeFromPlayer = playerDistance >= newEnemy.minPlayerSpawnDistance;
            let isSafeFromHumans = this.isSafeFromOtherActors(newEnemy, this.humans, newEnemy.minHumanSpawnDistance);
            let isSafeFromEnemies = this.isSafeFromOtherActors(newEnemy, this.enemies, newEnemy.minEnemySpawnDistance);
            if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                isSafeToSpawn = true
            }
        }
        return isSafeToSpawn
    };
    isSafeToSpawnHuman(newHuman, maxScreenXPosition, maxScreenYPosition) {
        let isSafeToSpawn = false;
        while (!isSafeToSpawn) {
            newHuman.screenXPosition = RNG(1, maxScreenXPosition);
            newHuman.screenYPosition = RNG(1, maxScreenYPosition);
            let playerDistance = this.calculateDistance(newHuman, this.player);
            let isSafeFromPlayer = playerDistance >= newHuman.minPlayerSpawnDistance;
            let isSafeFromHumans = this.isSafeFromOtherActors(newHuman, this.humans, newHuman.minHumanSpawnDistance);
            if (isSafeFromPlayer && isSafeFromHumans) {
                isSafeToSpawn = true
            }
        }
        return isSafeToSpawn
    };
    addEnemies(numberEnemies, enemyType) {
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(this);
            let maxScreenXPosition = this.canvas.width - newEnemy.width;
            let maxScreenYPosition = this.canvas.height - newEnemy.height;
            if (this.isSafeToSpawnEnemy(newEnemy, maxScreenXPosition, maxScreenYPosition)) {
                this.enemies.push(newEnemy);
            }
        }
    };
    addHumans(numberHumans, humanType) {
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(this);
            let maxScreenXPosition = this.canvas.width - newHuman.width;
            let maxScreenYPosition = this.canvas.height - newHuman.height;
            if (this.isSafeToSpawnHuman(newHuman, maxScreenXPosition, maxScreenYPosition)) {
                this.humans.push(newHuman);
            }
        }
    };
    spawnEnemies() { // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
        this.addHumans(8, Mommy);
        this.addEnemies(5, Hulk);
        this.addEnemies(15, Grunt)
    };
    removeDeadOrRescuedActors() {
        this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        this.humans = this.humans.filter(human => human.isAlive && !human.wasRescued)
    }
}
