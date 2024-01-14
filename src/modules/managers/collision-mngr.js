export {CollisionManager};

class CollisionManager {
    update(game) {
        const {actorMngr, scoreMngr, soundMngr, projectileMngr, debuggerr} = game;
        if (!debuggerr.actorInvincibility) {
            this.checkAllCollisions(actorMngr.player, actorMngr.enemies, actorMngr.humans, scoreMngr, soundMngr, projectileMngr);
        }
    }
    checkAllCollisions(player, enemies, humans, scoreMngr, soundMngr, projectileMngr) {
        this.checkPlayerCollisions(player, enemies, scoreMngr, soundMngr, projectileMngr);
        this.checkHumanCollisions(player, enemies, humans, scoreMngr, soundMngr);
        this.checkProjectileCollisions(projectileMngr.projectiles, enemies, scoreMngr, soundMngr);
    }
    getHitbox(actor) {
        return { //    Adjusts the hitbox alignment        Keeps hitbox centered on the sprite
            left: (actor.screenX - actor.hitboxXOffset) + (actor.width - actor.hitboxWidth) / 2,
            right: (actor.screenX - actor.hitboxXOffset) + (actor.width + actor.hitboxWidth) / 2,
            top: (actor.screenY - actor.hitboxYOffset) + (actor.height - actor.hitboxHeight) / 2,
            bottom: (actor.screenY - actor.hitboxYOffset) + (actor.height + actor.hitboxHeight) / 2
        };
    }
    getRotatedHitbox(projectile) {
        const halfWidth = projectile.width / 2;
        const halfHeight = projectile.height / 2;
        const centerX = projectile.screenX + halfWidth;
        const centerY = projectile.screenY + halfHeight;
        const rotatedX1 = centerX - (halfWidth * Math.abs(Math.cos(projectile.angle))) - (halfHeight * Math.abs(Math.sin(projectile.angle)));
        const rotatedX2 = centerX + (halfWidth * Math.abs(Math.cos(projectile.angle))) + (halfHeight * Math.abs(Math.sin(projectile.angle)));
        const rotatedY1 = centerY - (halfWidth * Math.abs(Math.sin(projectile.angle))) - (halfHeight * Math.abs(Math.cos(projectile.angle)));
        const rotatedY2 = centerY + (halfWidth * Math.abs(Math.sin(projectile.angle))) + (halfHeight * Math.abs(Math.cos(projectile.angle)));
        return {
            left: Math.min(rotatedX1, rotatedX2),
            right: Math.max(rotatedX1, rotatedX2),
            top: Math.min(rotatedY1, rotatedY2),
            bottom: Math.max(rotatedY1, rotatedY2)
        };
    }
    isProjectile(actor) {
        return actor.angle !== undefined;
    }
    // Checks collision between two actors
    // Projectile shall always be 'actor'
    checkSingleCollision(actor, target) {
        const targetHitbox = this.getHitbox(target);
        if (this.isProjectile(actor)) {
            const actorRotatedHitbox = this.getRotatedHitbox(actor);
            return (
                actorRotatedHitbox.right >= targetHitbox.left 
                && actorRotatedHitbox.left <= targetHitbox.right 
                && actorRotatedHitbox.bottom >= targetHitbox.top 
                && actorRotatedHitbox.top <= targetHitbox.bottom
            );
        }
        const actorHitbox = this.getHitbox(actor);
        return (
            actorHitbox.right >= targetHitbox.left 
            && actorHitbox.left <= targetHitbox.right 
            && actorHitbox.bottom >= targetHitbox.top 
            && actorHitbox.top <= targetHitbox.bottom
        );
    }
    // IF ... RETURN TRUE BREAK
    checkPlayerCollisions(player, enemies, scoreMngr, soundMngr, projectileMngr) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy)) {
                player.alive = false;
                player.lives--;
                scoreMngr.resetRescueBonus();
                soundMngr.playSound("playerDestroyed", 6);
                projectileMngr.eraseAllProjectiles();
                break;
            }
        }
    }
    // IF ... RETURN TRUE BREAK
    checkHumanPlayerCollision(humans, player, scoreMngr, soundMngr) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human)) {
                human.rescued = true;
                scoreMngr.awardRecuePoints(human);
                soundMngr.playSound("humanRescued", 4, 0.47);
                break;
            }
        }
    }
    isHulk(enemy) {
        return enemy.constructor.name === "Hulk";
    }
    // IF ... RETURN TRUE BREAK
    checkHumanEnemyCollision(humans, enemies, soundMngr) {
        for (const enemy of enemies) {
            if (this.isHulk(enemy)) {
                for (const human of humans) {
                    if (this.checkSingleCollision(human, enemy)) {
                        human.alive = false;
                        soundMngr.playSound("humanDestroyed", 4, 0.48);
                        break;
                    }
                }
            }
        }
    }
    checkHumanCollisions(player, enemies, humans, scoreMngr, soundMngr) {
        this.checkHumanPlayerCollision(humans, player, scoreMngr, soundMngr);
        this.checkHumanEnemyCollision(humans, enemies, soundMngr);
    }
    knockbackHulk(projectile, hulk) {
        const {direction, knockbackForce} = projectile;
        const directionMap = {
            "up": {x: 0, y: -1},
            "upright": {x: 1, y: -1},
            "upleft": {x: -1, y: -1},
            "left": {x: -1, y: 0},
            "right": {x: 1, y: 0},
            "down": {x: 0, y: 1},
            "downright": {x: 1, y: 1},
            "downleft": {x: -1, y: 1},
        };
        const {x: knockbackXDirection, y: knockbackYDirection} = directionMap[direction];
        hulk.screenX += knockbackXDirection * knockbackForce;
        hulk.screenY += knockbackYDirection * knockbackForce;
    }
    // Checks collision between all projectiles and enemies
    checkProjectileCollisions(projectiles, enemies, scoreMngr, soundMngr) {
        for (const projectile of projectiles) {
            for (const enemy of enemies) {
                // IF ... RETURN TRUE BREAK
                if (this.checkSingleCollision(projectile, enemy)) {
                    if (!this.isHulk(enemy)) {
                        enemy.alive = false;
                        scoreMngr.awardEnemyPoints(enemy);
                        soundMngr.playSound("enemyDestroyed", 3, 0.086);
                    } else {
                        this.knockbackHulk(projectile, enemy);
                    }
                    projectile.mustDelete = true;
                    break;
                }
            }
        }
    }
}
