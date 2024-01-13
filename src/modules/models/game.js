export {Game};
import {spritesIndex, soundFxIndex} from "../helpers/indexes.js";
import {UserInterface} from "./ui.js";
import {UIManager} from "../managers/ui-mngr.js";
import {SoundManager} from "../managers/sound-mngr.js";
import {ActorManager} from "../managers/actor-mngr.js";
import {ProjectileManager} from "../managers/projectile-mngr.js";
import {InputManager} from "../managers/input-mngr.js";
import {ScoreManager} from "../managers/score-mngr.js";
import {CollisionManager} from "../managers/collision-mngr.js";
import {Debugger} from "./debugger.js";

import {Grunt} from "../actors/enemies/grunt.js";
import {Hulk} from "../actors/enemies/hulk.js";
import {Mommy} from "../actors/humans/mommy.js";

// Updates and draws all game elements. Instantiated in main.js
class Game {
    constructor() {
        this.globalTimer = 0;
        this.scoreMngr = new ScoreManager();
        this.ui = new UserInterface(this.scoreMngr);
        this.uiMngr = new UIManager();
        this.soundMngr = new SoundManager(soundFxIndex);
        this.actorMngr = new ActorManager(this, spritesIndex);
        this.projectileMngr = new ProjectileManager();
        this.inputMngr = new InputManager(this);
        this.collisionMngr = new CollisionManager();
        this.debuggerr = new Debugger();
    }
    update() {
        const {scoreMngr, ui, uiMngr, actorMngr, projectileMngr, inputMngr, collisionMngr} = this;
        if (actorMngr.player.isAlive) {
            actorMngr.update(this);
            inputMngr.update(actorMngr);
            projectileMngr.update(this);
            collisionMngr.update(this);
            scoreMngr.update(this);
            uiMngr.update(scoreMngr, ui, actorMngr, spritesIndex);
        }
    }
    draw() {
        const {ui, uiMngr, actorMngr, projectileMngr} = this;
        uiMngr.clear(ui);
        actorMngr.draw(ui.ctx);
        projectileMngr.draw(this, ui.ctx);
    }
    // TEMPORARY. WAVE METHOD
    // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
    spawnActors() {
        const {actorMngr} = this;
        actorMngr.addHumans(this, 15, Mommy, spritesIndex);
        actorMngr.addEnemies(this, 10, Hulk, spritesIndex);
        actorMngr.addEnemies(this, 25, Grunt, spritesIndex);
    }
}
