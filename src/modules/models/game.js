export {Game};
import {spritesIndex, soundFxIndex} from "../helpers/indexes.js";
import {UserInterface} from "../managers/ui-mngr.js";
import {SoundManager} from "../managers/sound-mngr.js";
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
        this.soundFxIndex = soundFxIndex;
        this.scoreMngr = new ScoreManager(this);
        this.uiMngr = new UserInterface(this);
        this.soundMngr = new SoundManager(this);
        this.player = new Player(this);
        this.enemies = new Set();
        this.humans = new Set();
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
            this.uiMngr.update();
        }
    }
    draw() {
        this.uiMngr.draw();
        this.actorMngr.draw(this.uiMngr.ctx);
        this.projectileMngr.draw(this.uiMngr.ctx);
    }
}
