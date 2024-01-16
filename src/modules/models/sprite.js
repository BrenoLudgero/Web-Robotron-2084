export {Sprite};
import {spritesIndex} from "../helpers/indexes.js";

class Sprite {
    constructor(spriteSrc) {
        this.spritesheet = new Image();
        this.spritesheet.src = this.getSprite(spriteSrc);
    }
    availableSprite(spriteSrc) {
        return spritesIndex.hasOwnProperty(spriteSrc);
    }
    getSprite(spriteSrc) {
        if (this.availableSprite(spriteSrc)) {
            return spritesIndex[spriteSrc];
        }
    }
}
