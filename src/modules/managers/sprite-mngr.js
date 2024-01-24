export {SpriteManager};
import {Sprite} from "../models/sprite.js";
import {spritesIndex, spritesheetYIndex} from "../helpers/indexes.js";
import {canAnimate, isActorOfType, getActorName} from "../helpers/globals.js";

class SpriteManager {
    notEndOfSheet(actor, maxSpritesheetX) {
        return actor.spritesheetX < maxSpritesheetX;
    }
    // Method used for static movement sprites
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
    // Called directly in Spawner
    nextSpawnerSprite(spawner) {
        const initialSpritesheetX = 0;
        if (spawner.currentSprite < spawner.lastSprite) {
            spawner.spritesheetX += spawner.originalWidth + 2;
            spawner.currentSprite++;
            return
        }
        spawner.currentSprite = 1;
        spawner.spritesheetX = initialSpritesheetX;
    }
    nextPlayerSprite(player) {
        if (canAnimate(player)) {
            this.nextSprite(player);
        }
    }
    // Method used for sprites that change based on the actor's direction
    cycleSprite(actor, direction) {
        const yPosition = spritesheetYIndex[getActorName(actor)][direction];
        actor.spritesheetY = yPosition;
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
        actor.sprites = new Sprite(getActorName(actor), spritesIndex).spritesheet;
    }
    spriteFound(spriteSrc) {
        return spritesIndex.hasOwnProperty(spriteSrc);
    }
    // Sets the actor's projectileSprite if found in spritesIndex
    setProjectileSprite(actor) {
        let spriteScr = `${getActorName(actor)}Projectile`; // e.g. 'playerProjectile'
        if (this.spriteFound(spriteScr)) {
            actor.projectileSprite = new Sprite(spriteScr, spritesIndex).spritesheet;
        }
    }
}
