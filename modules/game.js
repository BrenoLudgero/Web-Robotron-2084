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
        this.sprites = new Image();
        this.sprites.src = "img/sprites.png";
        this.canvas.width = 1016;
        this.canvas.height = 786;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.human = new Human(this);
        this.enemies = [];
        this.humans = [];
        this.keysPressed = [];
        this.input = new InputHandler(this);
        this.collision = new CollisionHandler(this);
        this.projectile = new Projectile(this);
        this.shouldDrawHitboxes = false;
        this.drawHitboxes = function(actor) {
            if (this.shouldDrawHitboxes) {
                this.ctx.beginPath(),
                this.ctx.rect(actor.screenXPosition, actor.screenYPosition, actor.adjustedWidth, actor.adjustedHeight),
                this.ctx.strokeStyle = "red",
                this.ctx.stroke()
            }
        };
        this.calculateDistance = function(actor1XPosition, actor1YPosition, actor2XPosition, actor2YPosition) {
            const distanceX = actor2XPosition - actor1XPosition;
            const distanceY = actor2YPosition - actor1YPosition;
            return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        };
        this.addEnemy = function(numberEnemies, enemy) {
            const minimumDistanceFromPlayer = 200; // SHRINKS ACCORDING TO WAVE (120 MINUMUM)
            const minimumDistanceBetweenEnemies = 48;
            const minimumDistanceFromHumans = 68;
            for (let i = 0; i < numberEnemies; i++) {
                const newEnemy = new enemy(this);
                let safeToSpawn = false;
                // MULTIPLE FUNCTIONS
                while (!safeToSpawn) {
                    newEnemy.screenXPosition = RNG(1, this.canvas.width - newEnemy.adjustedWidth);
                    newEnemy.screenYPosition = RNG(1, this.canvas.height - newEnemy.adjustedHeight);
                    const playerDistance = this.calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                    let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                    let isSafeFromEnemies = true;
                    let isSafeFromHumans = true;
                    for (let j = 0; j < this.enemies.length; j++) {
                        const otherEnemy = this.enemies[j];
                        const distanceBetweenEnemies = this.calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, otherEnemy.screenXPosition, otherEnemy.screenYPosition);
                        if (distanceBetweenEnemies <= minimumDistanceBetweenEnemies) {
                            isSafeFromEnemies = false;
                            break
                        }
                    };
                    for (let k = 0; k < this.humans.length; k++) {
                        const human = this.humans[k];
                        const distanceFromHumans = this.calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, human.screenXPosition, human.screenYPosition);
                        if (distanceFromHumans <= minimumDistanceFromHumans) {
                            isSafeFromHumans = false;
                            break
                        }
                    };
                    if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                        this.enemies.push(newEnemy);
                        safeToSpawn = true
                    }
                }
            }
        };
        this.addHuman = function(numberHumans, human) {
            const minimumDistanceFromPlayer = 100;
            const minimumDistanceBetweenHumans = 120;
            for (let i = 0; i < numberHumans; i++) {
                const newHuman = new human(this);
                let safeToSpawn = false;
                // MULTIPLE FUNCTIONS
                while (!safeToSpawn) {
                    newHuman.screenXPosition = RNG(1, this.canvas.width - newHuman.adjustedWidth);
                    newHuman.screenYPosition = RNG(1, this.canvas.height - newHuman.adjustedHeight);
                    const playerDistance = this.calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                    let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                    let isSafeFromEnemies = true;
                    let isSafeFromHumans = true;
                    for (let k = 0; k < this.humans.length; k++) {
                        const otherHuman = this.humans[k];
                        const distanceFromHumans = this.calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, otherHuman.screenXPosition, otherHuman.screenYPosition);
                        if (distanceFromHumans <= minimumDistanceBetweenHumans) {
                            isSafeFromHumans = false;
                            break
                        }
                    };
                    if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                        this.humans.push(newHuman);
                        safeToSpawn = true
                    }
                }
            }
        };
        this.spawnEnemies = function() {
            // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE (for now)
            this.addHuman(5, Mommy);
            this.addEnemy(8, Hulk);
            this.addEnemy(12, Grunt);
        }
    };
    update() {
        if (this.player.isAlive) {
            this.collision.update();
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update()
            });
            this.humans.forEach (human => {
                human.update()
            });
            this.enemies = this.enemies.filter(enemy => enemy.isAlive);
            this.humans = this.humans.filter(human => human.isAlive && !human.wasRescued)
        }
    };
    draw(context) {
        this.player.draw(context)
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        });
        this.humans.forEach(human => {
            human.draw(context)
        })
    }
}
