export {Game};
import {spritesIndex} from "../helpers/indexes.js";
import {Player} from "../actors/player.js";
import {Enemy} from "./enemy.js";
import {Human} from "./human.js";
import {ActorManager} from "../managers/actor-mngr.js";
import {InputManager} from "../managers/input.js";
import {CollisionManager} from "../managers/collision.js";
import {Debugger} from "./debugger.js";

class Game {
    constructor(canvas, context) {
        this.ctx = context;
        this.canvas = canvas;
        this.canvas.width;
        this.canvas.height;
        this.setCanvasScaledResolution(3);
        this.spritesIndex = spritesIndex;
        this.globalTimer = 0;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.enemies = [];
        this.human = new Human(this);
        this.humans = [];
        this.actorMngr = new ActorManager(this);
        this.input = new InputManager(this);
        this.keysPressed = [];
        this.collision = new CollisionManager(this);
        this.debuggerr = new Debugger(this)
    };
    update() {
        if (this.player.isAlive) {
            this.actorMngr.update(this.enemies, this.humans);
            this.collision.update()
        }
    };
    draw(context) {
        this.actorMngr.drawActors(this.enemies, context);
        this.actorMngr.drawActors(this.humans, context)
    };
    setCanvasScaledResolution(scaleFactor) {
        const originalWidth = 292;
        const originalHeight = 240;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight
    }
}
