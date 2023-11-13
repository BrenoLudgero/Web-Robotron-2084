export {Game};
import {spritesIndex} from "../helpers/indexes.js";
import {Player} from "../actors/player.js";
import {Enemy} from "./enemy.js";
import {Human} from "./human.js";
import {ActorManager} from "../managers/actor-mngr.js";
import {InputManager} from "../managers/input-mngr.js";
import {ProjectileManager} from "../managers/projectile-mngr.js";
import {CollisionManager} from "../managers/collision-mngr.js";
import {UserInterface} from "./ui.js";
import {Debugger} from "./debugger.js";

class Game {
    constructor() {
        this.score = 0; // Incresed in collisionMngr.check"Actor"Collision
        this.globalTimer = 0;
        this.spritesIndex = spritesIndex;
        this.ui = new UserInterface(this);
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.enemies = [];
        this.human = new Human(this);
        this.humans = [];
        this.actorMngr = new ActorManager(this);
        this.projectileMngr = new ProjectileManager(this);
        this.inputMngr = new InputManager(this);
        this.keysPressed = [];
        this.collisionMngr = new CollisionManager(this);
        this.debuggerr = new Debugger(this)
    };
    update() {
        if (this.player.isAlive) {
            this.actorMngr.update(this.enemies, this.humans);
            this.projectileMngr.update();
            this.collisionMngr.update();
            this.ui.update(this.player)
        }
    };
    draw() {
        this.ui.draw();
        this.actorMngr.draw(this.enemies, this.humans, this.ui.ctx);
        this.projectileMngr.draw(this.ui.ctx)
    }
}
