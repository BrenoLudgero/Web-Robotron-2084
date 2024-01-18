export {HitboxManager};
import {Hitbox} from "../models/hitbox.js";

class HitboxManager {
    setHitbox(actor, limb, width, height, xPosition, yPosition) {
        const hitbox = new Hitbox(width, height, xPosition, yPosition);
        actor.hitboxes[limb] = hitbox;
    }
    setAllHitboxes(actor) {
        for (const limb in actor.limbs) {
            const {width, height, xPosition, yPosition} = actor.limbs[limb];
            this.setHitbox(actor, limb, width, height, xPosition, yPosition);
        }
    }
    updateHitboxes(actor, limb, properties) {
        Object.keys(properties).forEach(property => {
            actor.hitboxes[limb][property] = properties[property];
        });
    }
}
