export {CollisionManager};
import {isActorOfType} from "../helpers/globals.js";

class CollisionManager {
    update(game) {
        const {actorMngr, projectileMngr, debuggerr} = game;
        const {player, enemies, humans} = actorMngr.actors;
        if (!debuggerr.actorInvincibility) {
            this.checkAllCollisions(player, enemies, humans, projectileMngr);
        }
    }
    checkAllCollisions(player, enemies, humans, projectileMngr) {
        this.checkPlayerCollisions(player, enemies);
        this.checkHumanCollisions(player, enemies, humans);
        this.checkProjectileCollisions(projectileMngr.projectiles, enemies);
    }
    isProjectile(actor) {
        return actor.angle !== undefined;
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
        const rotatedX1 = (centerX - (halfWidth * Math.abs(Math.cos(projectile.angle)))) - (halfHeight * Math.abs(Math.sin(projectile.angle)));
        const rotatedX2 = (centerX + (halfWidth * Math.abs(Math.cos(projectile.angle)))) + (halfHeight * Math.abs(Math.sin(projectile.angle)));
        const rotatedY1 = (centerY - (halfWidth * Math.abs(Math.sin(projectile.angle)))) - (halfHeight * Math.abs(Math.cos(projectile.angle)));
        const rotatedY2 = (centerY + (halfWidth * Math.abs(Math.sin(projectile.angle)))) + (halfHeight * Math.abs(Math.cos(projectile.angle)));
        return {
            left: Math.min(rotatedX1, rotatedX2),
            right: Math.max(rotatedX1, rotatedX2),
            top: Math.min(rotatedY1, rotatedY2),
            bottom: Math.max(rotatedY1, rotatedY2)
        };
    }
    collisionDetected(actor, target) {
        return (
            actor.right >= target.left 
            && actor.left <= target.right 
            && actor.bottom >= target.top 
            && actor.top <= target.bottom
        );
    }
    // Checks collision between two actors
    checkSingleCollision(actor, target) {
        for (const targetLimb in target.hitboxes) {
            const targetHitbox = this.getLimbHitbox(target, targetLimb);
            if (this.isProjectile(actor)) {
                const projectileHitbox = this.getRotatedHitbox(actor);
                if (this.collisionDetected(projectileHitbox, targetHitbox)) {
                    return true;
                }
            } else {
                for (const actorLimb in actor.hitboxes) {
                    const actorHitbox = this.getLimbHitbox(actor, actorLimb);
                    if (this.collisionDetected(actorHitbox, targetHitbox)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    checkPlayerCollisions(player, enemies) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy)) {
                player.updateState("destroyed");
                break;
            }
        }
    }
    checkHumanPlayerCollision(humans, player) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human)) {
                human.updateState("rescued");
                break;
            }
        }
    }
    checkHumanEnemyCollision(humans, enemies) {
        for (const enemy of enemies) {
            if (isActorOfType(enemy, "Hulk")) {
                for (const human of humans) {
                    if (this.checkSingleCollision(human, enemy)) {
                        human.updateState("destroyed");
                        break;
                    }
                }
            }
        }
    }
    checkHumanCollisions(player, enemies, humans) {
        this.checkHumanPlayerCollision(humans, player);
        this.checkHumanEnemyCollision(humans, enemies);
    }
    // Checks collision between all projectiles and enemies
    checkProjectileCollisions(projectiles, enemies) {
        for (const projectile of projectiles) {
            for (const enemy of enemies) {
                if (this.checkSingleCollision(projectile, enemy)) {
                    if (!isActorOfType(enemy, "Hulk")) {
                        enemy.updateState("destroyed");
                    } else {
                        projectile.knockback(enemy);
                    }
                    projectile.mustDelete = true;
                    break;
                }
            }
        }
    }
}
