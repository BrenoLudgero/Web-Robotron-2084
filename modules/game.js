export {Game};
import {RNG} from "./global_functions.js";
import {Player} from "./player.js";
import {Enemy} from "./models/enemy.js";
import {Human} from "./models/human.js";
import {Mommy} from "./humans/mommy.js";
import {Grunt} from "./enemies/grunt.js";
import {Hulk} from "./enemies/hulk.js";
import {InputHandler} from "./handlers/input_handler.js";
import {CollisionHandler} from "./handlers/collision_handler.js";
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
        this.input = new InputHandler(this);
        this.keysPressed = [];
        this.collision = new CollisionHandler(this);
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
    // REFACTOR
    addEnemies(numberEnemies, enemyType) {
        let minDistanceFromPlayer = 180; // SHRINKS ACCORDING TO WAVE (TEST LIMITS)
        const minDistanceFromHumans = 70;
        const minDistanceBetweenEnemies = 60;
        for (let i = 0; i < numberEnemies; i++) {
            let isSafeToSpawn = false;
            const newEnemy = new enemyType(this);
            let maxScreenXPosition = this.canvas.width - newEnemy.width;
            let maxScreenYPosition = this.canvas.height - newEnemy.height;
            while (!isSafeToSpawn) {
                newEnemy.screenXPosition = RNG(1, maxScreenXPosition);
                newEnemy.screenYPosition = RNG(1, maxScreenYPosition);
                let playerDistance = this.calculateDistance(newEnemy, this.player);
                let isSafeFromPlayer = playerDistance >= minDistanceFromPlayer;
                let isSafeFromEnemies = this.isSafeFromOtherActors(newEnemy, this.enemies, minDistanceBetweenEnemies);
                let isSafeFromHumans = this.isSafeFromOtherActors(newEnemy, this.humans, minDistanceFromHumans);
                if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                    this.enemies.push(newEnemy);
                    isSafeToSpawn = true
                }
            }
        }
    };
    // REFACTOR
    addHumans(numberHumans, humanType) {
        const minDistanceFromPlayer = 100;
        const minDistanceBetweenHumans = 125;
        for (let i = 0; i < numberHumans; i++) {
            let isSafeToSpawn = false;
            const newHuman = new humanType(this);
            let maxScreenXPosition = this.canvas.width - newHuman.width;
            let maxScreenYPosition = this.canvas.height - newHuman.height;
            while (!isSafeToSpawn) {
                newHuman.screenXPosition = RNG(1, maxScreenXPosition);
                newHuman.screenYPosition = RNG(1, maxScreenYPosition);
                let playerDistance = this.calculateDistance(newHuman, this.player);
                let isSafeFromPlayer = playerDistance >= minDistanceFromPlayer;
                let isSafeFromHumans = this.isSafeFromOtherActors(newHuman, this.humans, minDistanceBetweenHumans);
                if (isSafeFromPlayer && isSafeFromHumans) {
                    this.humans.push(newHuman);
                    isSafeToSpawn = true
                }
            }
        }
    };
    spawnEnemies() {
        // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE (for now)
        this.addHumans(8, Mommy);
        this.addEnemies(5, Hulk);
        this.addEnemies(15, Grunt)
    };
    removeDeadOrRescuedActors() {
        this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        this.humans = this.humans.filter(human => human.isAlive && !human.wasRescued)
    }
}
