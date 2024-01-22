export {CollisionManager};
import {isActorOfType} from "../helpers/globals.js";

class CollisionManager {
    update(game) {
        const {actorMngr, projectileMngr, hitboxMngr, debuggerr} = game;
        const {player, enemies, humans} = actorMngr.actors;
        if (!debuggerr.actorInvincibility) {
            this.checkAllCollisions(player, enemies, humans, projectileMngr, hitboxMngr);
        }
    }
    checkAllCollisions(player, enemies, humans, projectileMngr, hitboxMngr) {
        this.checkPlayerCollisions(player, enemies, hitboxMngr);
        this.checkHumanCollisions(player, enemies, humans, hitboxMngr);
        this.checkProjectileCollisions(projectileMngr.projectiles, enemies, hitboxMngr);
    }
    isProjectile(actor) {
        return actor.angle !== undefined;
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
    checkSingleCollision(actor, target, hitboxMngr) {
        if (this.isProjectile(actor)) {
            const projectileHitbox = hitboxMngr.getRotatedHitbox(actor);
            for (const targetLimb in target.hitboxes) {
                const targetHitbox = hitboxMngr.getLimbHitbox(target, targetLimb);
                if (this.collisionDetected(projectileHitbox, targetHitbox)) {
                    return true;
                }
            }
        } else {
            for (const actorLimb in actor.hitboxes) {
                const actorHitbox = hitboxMngr.getLimbHitbox(actor, actorLimb);
                for (const targetLimb in target.hitboxes) {
                    const targetHitbox = hitboxMngr.getLimbHitbox(target, targetLimb);
                    if (this.collisionDetected(actorHitbox, targetHitbox)) {
                        return true;
                    }
                }
            }
        }
    }
    checkPlayerCollisions(player, enemies, hitboxMngr) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy, hitboxMngr)) {
                player.updateState("destroyed");
                break;
            }
        }
    }
    checkHumanPlayerCollision(humans, player, hitboxMngr) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human, hitboxMngr)) {
                human.updateState("rescued");
                break;
            }
        }
    }
    checkHumanEnemyCollision(humans, enemies, hitboxMngr) {
        for (const enemy of enemies) {
            if (isActorOfType(enemy, "Hulk")) {
                for (const human of humans) {
                    if (this.checkSingleCollision(human, enemy, hitboxMngr)) {
                        human.updateState("destroyed");
                        break;
                    }
                }
            }
        }
    }
    checkHumanCollisions(player, enemies, humans, hitboxMngr) {
        this.checkHumanPlayerCollision(humans, player, hitboxMngr);
        this.checkHumanEnemyCollision(humans, enemies, hitboxMngr);
    }
    // Checks collision between all projectiles and enemies
    checkProjectileCollisions(projectiles, enemies, hitboxMngr) {
        for (const projectile of projectiles.player) {
            for (const enemy of enemies) {
                if (this.checkSingleCollision(projectile, enemy, hitboxMngr)) {
                    if (!isActorOfType(enemy, "Hulk")) {
                        enemy.updateState("destroyed");
                    } else {
                        projectile.knockback(enemy);
                    }
                    projectile.mustDelete = true;
                    break;
                }
            }
            for (const enemyProjectile of projectiles.enemies) {
                if (this.checkSingleCollision(projectile, enemyProjectile, hitboxMngr)) {
                    projectile.mustDelete = true;
                    enemyProjectile.mustDelete = true;
                    break;
                }
            }
        }
    }
}
