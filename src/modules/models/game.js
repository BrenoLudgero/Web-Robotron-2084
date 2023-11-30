export {Game};
import {spritesIndex} from "../helpers/indexes.js";
import {UserInterface} from "./ui.js";
import {Player} from "../actors/player.js";
import {ActorManager} from "../managers/actor-mngr.js";
import {ProjectileManager} from "../managers/projectile-mngr.js";
import {InputManager} from "../managers/input-mngr.js";
import {ScoreManager} from "../managers/score-mngr.js";
import {CollisionManager} from "../managers/collision-mngr.js";
import {Debugger} from "./debugger.js";

// Updates and draws all game elements. Instantiated in main.js
class Game {
    constructor() {
        this.globalTimer = 0;
        this.spritesIndex = spritesIndex;
        this.scoreMngr = new ScoreManager(this);
        this.ui = new UserInterface(this);
        this.player = new Player(this);
        this.enemies = [];
        this.humans = [];
        this.actorMngr = new ActorManager(this);
        this.projectileMngr = new ProjectileManager(this);
        this.inputMngr = new InputManager(this);
        this.keysPressed = [];
        this.collisionMngr = new CollisionManager(this);
        this.debuggerr = new Debugger(this);
    }
    update() {
        if (this.player.isAlive) {
            this.inputMngr.update();
            this.actorMngr.update();
            this.projectileMngr.update();
            this.collisionMngr.update();
            this.scoreMngr.update();
            this.ui.update();
        }
    }
    draw() {
        this.ui.draw();
        this.actorMngr.draw(this.ui.ctx);
        this.projectileMngr.draw(this.ui.ctx);
    }
}
