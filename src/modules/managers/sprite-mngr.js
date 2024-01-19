export {SpriteManager};
import {Sprite} from "../models/sprite.js";
import {spritesIndex, spritesheetYIndex} from "../helpers/indexes.js";
import {canMove, isActorOfType} from "../helpers/globals.js";

class SpriteManager {
    notEndOfSheet(actor, maxSpritesheetX) {
        return actor.spritesheetX < maxSpritesheetX;
    }
    nextSprite(actor) {
        const initialSpritesheetX = 0;
        const maxSpritesheetX = actor.sprites.width - actor.width;
        if (this.notEndOfSheet(actor, maxSpritesheetX)) {
            // Sprites in the spritesheet are always horizontaly separated by 2 pixels
            actor.spritesheetX += actor.originalWidth + 2;
            return;
        }
        actor.spritesheetX = initialSpritesheetX;
    }
    nextPlayerSprite(player) {
        if (canMove(player)) { // Unrelated to the ability to move in this specific case
            this.nextSprite(player);
        }
    }
    getActorName(actor) {
        return actor.constructor.name.toLowerCase(); // e.g. 'player'
    }
    cycleSprite(actor, direction) {
        // Moves to the vertical position in the spritesheet that corresponds to the actor's current direction
        if (direction !== undefined) {
            const yPosition = spritesheetYIndex[this.getActorName(actor)][direction];
            actor.spritesheetY = yPosition;
        }
        if (isActorOfType(actor, "Player")) {
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
        actor.sprites = new Sprite(this.getActorName(actor), spritesIndex).spritesheet;
    }
    spriteFound(spriteSrc) {
        return spritesIndex.hasOwnProperty(spriteSrc);
    }
    // Sets the actor's projectileSprite if found in spritesIndex
    setProjectileSprite(actor) {
        let spriteScr = `${this.getActorName(actor)}Projectile`; // e.g. 'playerProjectile'
        if (this.spriteFound(spriteScr)) {
            actor.projectileSprite = new Sprite(spriteScr, spritesIndex).spritesheet;
        }
    }
}
