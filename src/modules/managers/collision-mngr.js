export {CollisionManager};
import {isActorOfType} from "../helpers/globals.js";

class CollisionManager {
    update(game) {
        const {actorMngr, projectileMngr, hitboxMngr, debuggerr} = game;
        const {player, enemies, humans} = actorMngr.actors;
        if (!debuggerr.actorInvincibility) {
            this.handleAllCollisions(player, enemies, humans, projectileMngr, hitboxMngr, game);
        }
    }
    handleAllCollisions(player, enemies, humans, projectileMngr, hitboxMngr, game) {
        this.handlePlayerEnemyCollision(player, enemies, hitboxMngr);
        this.handleHumanCollisions(player, enemies, humans, hitboxMngr);
        this.handleProjectileCollisions(projectileMngr.projectiles, enemies, player, hitboxMngr, game);
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
        const actorHitboxes = hitboxMngr.getInitialHitboxes(actor);
        const targetHitboxes = hitboxMngr.getInitialHitboxes(target);
        for (const actorLimb in actorHitboxes) {
            for (const targetLimb in targetHitboxes) {
                const actorHitbox = hitboxMngr.getLimbsHitboxes(actor, actorHitboxes, actorLimb);
                const targetHitbox = hitboxMngr.getLimbsHitboxes(target, targetHitboxes, targetLimb);
                if (this.collisionDetected(actorHitbox, targetHitbox)) {
                    return true;
                }
            }
        }
    }
    handleHumanPlayerCollision(humans, player, hitboxMngr) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human, hitboxMngr)) {
                human.updateState("rescued");
                break;
            }
        }
    }
    handleHumanEnemyCollision(humans, enemies, hitboxMngr) {
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
    handleHumanCollisions(player, enemies, humans, hitboxMngr) {
        this.handleHumanPlayerCollision(humans, player, hitboxMngr);
        this.handleHumanEnemyCollision(humans, enemies, hitboxMngr);
    }
    handlePlayerEnemyCollision(player, enemies, hitboxMngr) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy, hitboxMngr)) {
                player.updateState("destroyed");
                break;
            }
        }
    }
    handleCollisionOutcome(playerProjectile, enemy, game) {
        if (!isActorOfType(enemy, "Hulk")) {
            enemy.updateState("destroyed");
        } else {
            playerProjectile.push(enemy);
            game.soundMngr.playSound("hulkPushed")
        }
        playerProjectile.updateState("destroyed");
    }
    handlePlayerProjectileEnemyCollisions(playerProjectiles, enemies, hitboxMngr, game) {
        for (const playerProjectile of playerProjectiles) {
            for (const enemy of enemies) {
                if (this.checkSingleCollision(playerProjectile, enemy, hitboxMngr)) {
                    this.handleCollisionOutcome(playerProjectile, enemy, game);
                    break;
                }
            }
        }
    }
    handleProjectileOnProjectileCollisions(playerProjectiles, enemyProjectiles, hitboxMngr) {
        for (const playerProjectile of playerProjectiles) {
            for (const enemyProjectile of enemyProjectiles) {
                if (this.checkSingleCollision(playerProjectile, enemyProjectile, hitboxMngr)) {
                    playerProjectile.updateState("destroyed");
                    enemyProjectile.updateState("destroyed");
                    break;
                }
            }
        }
    }
    handleEnemyProjectilePlayerCollision(enemyProjectiles, player, hitboxMngr) {
        for (const enemyProjectile of enemyProjectiles) {
            if (this.checkSingleCollision(enemyProjectile, player, hitboxMngr)) {
                player.updateState("destroyed");
                break;
            }
        }
    }
    // Handles collision of all projectiles against enemies, other projectiles and the player
    handleProjectileCollisions(projectiles, enemies, player, hitboxMngr, game) {
        this.handlePlayerProjectileEnemyCollisions(projectiles.player, enemies, hitboxMngr, game);
        this.handleProjectileOnProjectileCollisions(projectiles.player, projectiles.enemies, hitboxMngr);
        this.handleEnemyProjectilePlayerCollision(projectiles.enemies, player, hitboxMngr);
    }
}
