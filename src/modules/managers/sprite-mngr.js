export {SpriteManager};
import {Sprite} from "../models/sprite.js";
import {spritesIndex} from "../helpers/indexes.js";
import {canMove, typeOfActor} from "../helpers/globals.js";

class SpriteManager {
    notEndOfSheet(actor, maxSpritesheetX) {
        return actor.spritesheetX < maxSpritesheetX;
    }
    nextSprite(actor) {
        const initialSpritesheetX = 0;
        const maxSpritesheetX = actor.sprites.spritesheet.width - actor.width;
        if (this.notEndOfSheet(actor, maxSpritesheetX)) {
            actor.spritesheetX += actor.spritesheetIncrement;
            return;
        }
        actor.spritesheetX = initialSpritesheetX;
    }
    nextPlayerSprite(player) {
        if (canMove(player)) { // Unrelated to the ability to move in this specific case
            this.nextSprite(player);
        }
    }
    cycleSprite(actor, spritesheetY) {
        if (spritesheetY != undefined) {
            actor.spritesheetY = spritesheetY;
        }
        if (typeOfActor(actor, "Player")) {
            this.nextPlayerSprite(actor);
        }
        else {
            this.nextSprite(actor);
        }
    }
    setSprite(spriteScr) {
        return new Sprite(spriteScr, spritesIndex).spritesheet;
    }
    setActorSprites(actor) {
        actor.sprites = new Sprite(actor.getActorType(), spritesIndex).spritesheet;
    }
    spriteFound(spriteSrc) {
        return spritesIndex.hasOwnProperty(spriteSrc);
    }
    // Sets an Actor projectileSprite if found in spritesIndex
    setProjectileSprite(actor) {
        let spriteScr = `${actor.getActorType()}Projectile`; // e.g. 'playerProjectile'
        if (this.spriteFound(spriteScr)) {
            actor.projectileSprite = new Sprite(spriteScr, spritesIndex).spritesheet;
        }
    }
}
