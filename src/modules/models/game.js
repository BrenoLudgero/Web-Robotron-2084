export {Game};
import {Score} from "./score.js";
import {UserInterface} from "./ui.js";
import {SpriteManager} from "../managers/sprite-mngr.js";
import {HitboxManager} from "../managers/hitbox-mngr.js";
import {UIManager} from "../managers/ui-mngr.js";
import {SoundManager} from "../managers/sound-mngr.js";
import {ActorManager} from "../managers/actor-mngr.js";
import {ProjectileManager} from "../managers/projectile-mngr.js";
import {InputManager} from "../managers/input-mngr.js";
import {CollisionManager} from "../managers/collision-mngr.js";
import {StateManager} from "../managers/state-mngr.js";
import {Debugger} from "./debugger.js";

import {Grunt} from "../actors/enemies/grunt.js";
import {Hulk} from "../actors/enemies/hulk.js";
import {Mommy} from "../actors/humans/mommy.js";

// Updates and draws all game elements. Instantiated in main.js
class Game {
    constructor() {
        this.globalTimer = 0;
        this.score = new Score();
        this.spriteMngr = new SpriteManager();
        this.hitboxMngr = new HitboxManager();
        this.ui = new UserInterface(this);
        this.uiMngr = new UIManager();
        this.soundMngr = new SoundManager();
        this.actorMngr = new ActorManager(this);
        this.projectileMngr = new ProjectileManager();
        this.inputMngr = new InputManager(this);
        this.collisionMngr = new CollisionManager();
        this.stateMngr = new StateManager(this);
        this.debuggerr = new Debugger();
    }
    update() {
        const {score, ui, soundMngr, actorMngr, stateMngr} = this;
        let player = actorMngr.actors.player;
        if (!stateMngr.actorDestroyed(player)) {
            actorMngr.update();
            this.inputMngr.update(player);
            this.projectileMngr.update(this);
            this.collisionMngr.update(this);
            score.update(player, soundMngr);
            stateMngr.update();
            this.uiMngr.update(score, ui, actorMngr);
        }
    }
    draw() {
        const {ui, uiMngr, actorMngr, projectileMngr} = this;
        uiMngr.clear(ui);
        actorMngr.draw(ui.context);
        projectileMngr.draw(this, ui.context);
    }
    // TEMPORARY. WAVE METHOD
    // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
    spawnActors() {
        const {actorMngr} = this;
        actorMngr.addActors(15, Mommy);
        actorMngr.addActors(10, Hulk);
        actorMngr.addActors(25, Grunt);
    }
}
