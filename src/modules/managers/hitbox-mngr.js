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
    getLimbHitbox(actor, limb) {
        const hitbox = actor.hitboxes[limb];
        return {
            left: actor.screenX + hitbox.xPosition,
            right: (actor.screenX + hitbox.xPosition) + hitbox.width,
            top: actor.screenY + hitbox.yPosition,
            bottom: (actor.screenY + hitbox.yPosition) + hitbox.height
        };
    }
    getRotatedHitbox(projectile) {
        const halfWidth = projectile.width / 2;
        const halfHeight = projectile.height / 2;
        const centerX = projectile.screenX + halfWidth;
        const centerY = projectile.screenY + halfHeight;
        const cosAngle = Math.cos(projectile.angle);
        const sinAngle = Math.sin(projectile.angle);
        const rotatedX1 = (centerX - (halfWidth * Math.abs(cosAngle))) - (halfHeight * Math.abs(sinAngle));
        const rotatedX2 = (centerX + (halfWidth * Math.abs(cosAngle))) + (halfHeight * Math.abs(sinAngle));
        const rotatedY1 = (centerY - (halfWidth * Math.abs(sinAngle))) - (halfHeight * Math.abs(cosAngle));
        const rotatedY2 = (centerY + (halfWidth * Math.abs(sinAngle))) + (halfHeight * Math.abs(cosAngle));
        return {
            left: Math.min(rotatedX1, rotatedX2),
            right: Math.max(rotatedX1, rotatedX2),
            top: Math.min(rotatedY1, rotatedY2),
            bottom: Math.max(rotatedY1, rotatedY2)
        };
    }
}
