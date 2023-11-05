export {Game};
import {RNG} from "./global_functions.js";
import {Player} from "./player.js";
import {Projectile} from "./models/projectile.js";
import {Enemy} from "./models/enemy.js";
import {Human} from "./models/human.js";
import {Mommy} from "./humans/mommy.js";
import {Grunt} from "./enemies/grunt.js";
import {Hulk} from "./enemies/hulk.js";
import {InputHandler} from "./handlers/input_handler.js";
import {CollisionHandler} from "./handlers/collision_handler.js";

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.currentFrame = 0;
        this.canvas.width = 1016;
        this.canvas.height = 786;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.enemies = [];
        this.human = new Human(this);
        this.humans = [];
        this.input = new InputHandler(this);
        this.keysPressed = [];
        this.collision = new CollisionHandler(this);
        this.projectile = new Projectile(this);
        this.shouldDrawHitboxes = false;
        this.actorInvincibility = false  //  !  !  !  !  !
    };
    update() {
        if (this.player.isAlive) {
            this.collision.update();
            this.player.update();
            this.updateActors(this.enemies);
            this.updateActors(this.humans);
            this.removeDeadOrRescuedActors()
        }
    };
    draw(context) {
        this.player.draw(context);
        this.drawActors(this.enemies, context);
        this.drawActors(this.humans, context)
    };
    drawActors(actors, context) {
        actors.forEach(actor => {
            actor.draw(context)
        })
    };
    drawHitboxes(actor) {
        if (this.shouldDrawHitboxes) {
            this.ctx.beginPath();
            this.ctx.rect(actor.screenXPosition, actor.screenYPosition, actor.width * 1.8, actor.height * 1.8);
            this.ctx.strokeStyle = "red";
            this.ctx.stroke()
        }
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
    addEnemies(numberEnemies, enemyType) {
        let minimumDistanceFromPlayer = 200; // SHRINKS ACCORDING TO WAVE (120 MINIMUM)
        const minimumDistanceBetweenEnemies = 48;
        const minimumDistanceFromHumans = 68;
        for (let i = 0; i < numberEnemies; i++) {
            const newEnemy = new enemyType(this);
            let safeToSpawn = false;
            while (!safeToSpawn) {
                newEnemy.screenXPosition = RNG(1, this.canvas.width - (newEnemy.width * 1.8));
                newEnemy.screenYPosition = RNG(1, this.canvas.height - (newEnemy.height * 1.8));
                const playerDistance = this.calculateDistance(newEnemy, this.player);
                let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                let isSafeFromEnemies = this.isSafeFromOtherActors(newEnemy, this.enemies, minimumDistanceBetweenEnemies);
                let isSafeFromHumans = this.isSafeFromOtherActors(newEnemy, this.humans, minimumDistanceFromHumans);
                if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                    this.enemies.push(newEnemy);
                    safeToSpawn = true
                }
            }
        }
    };
    addHumans(numberHumans, humanType) {
        const minimumDistanceFromPlayer = 100;
        const minimumDistanceBetweenHumans = 120;
        for (let i = 0; i < numberHumans; i++) {
            const newHuman = new humanType(this);
            let safeToSpawn = false;
            while (!safeToSpawn) {
                newHuman.screenXPosition = RNG(1, this.canvas.width - (newHuman.width * 1.8));
                newHuman.screenYPosition = RNG(1, this.canvas.height - (newHuman.height * 1.8));
                const playerDistance = this.calculateDistance(newHuman, this.player);
                let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                let isSafeFromHumans = this.isSafeFromOtherActors(newHuman, this.humans, minimumDistanceBetweenHumans);
                if (isSafeFromPlayer && isSafeFromHumans) {
                    this.humans.push(newHuman);
                    safeToSpawn = true
                }
            }
        }
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
    removeDeadOrRescuedActors() {
        this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        this.humans = this.humans.filter(human => human.isAlive && !human.wasRescued)
    };
    spawnEnemies() {
        // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE (for now)
        this.addHumans(5, Mommy);
        this.addEnemies(8, Hulk);
        this.addEnemies(12, Grunt)
    };
    logActorCount() {  //  !  !  !  !  !
        console.log("Humans: " + this.humans.length);
        console.log("Enemies: " + this.enemies.length);
        console.log("")
    }
}
