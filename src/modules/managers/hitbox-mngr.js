export {HitboxManager};
import {Hitbox} from "../models/hitbox.js";

class HitboxManager {
    setHitbox(actor, limb, width, height, xPosition, yPosition) {
        const hitbox = new Hitbox(width, height, xPosition, yPosition);
        actor.hitboxes[limb] = hitbox;
    }
    setAllHitboxes(actor) {
        const hitboxConfig = actor.hitboxConfig.down;
        for (const limb in hitboxConfig) {
            const {width, height, xPosition, yPosition} = hitboxConfig[limb];
            this.setHitbox(actor, limb, width, height, xPosition, yPosition);
        }
    }
    updateSpawnerHitbox(spawner) {
        spawner.hitboxes = spawner.hitboxConfig[spawner.currentSprite];
    }
    updateHitboxes(actor, limb, properties) {
        Object.keys(properties).forEach(property => {
            actor.hitboxes[limb][property] = properties[property];
        });
    }
}
