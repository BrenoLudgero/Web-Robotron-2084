export {CollisionManager};

class CollisionManager {
    constructor(game) {
        this.game = game;
    }
    update() {
        const {player, actorMngr, scoreMngr, soundMngr, projectileMngr, debuggerr} = this.game;
        if (!debuggerr.actorInvincibility) {
            this.checkAllCollisions(player, actorMngr.enemies, actorMngr.humans, scoreMngr, soundMngr, projectileMngr);
        }
    }
    checkAllCollisions(player, enemies, humans, scoreMngr, soundMngr, projectileMngr) {
        this.checkPlayerCollisions(player, enemies, scoreMngr, soundMngr, projectileMngr);
        this.checkHumanCollisions(player, enemies, humans, scoreMngr, soundMngr);
        this.checkProjectileCollisions(this.game.projectileMngr.projectiles, enemies);
    }
    // Checks collision between two actors
    checkSingleCollision(actor, target) { // Projectile shall always be 'actor'
        const targetHitbox = this.getHitbox(target);
        if (actor.angle !== undefined) { // Projectiles only
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
    checkPlayerCollisions(player, enemies, scoreMngr, soundMngr, projectileMngr) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy)) {
                player.isAlive = false;
                player.lives--;
                scoreMngr.resetRescueBonus();
                soundMngr.playSound(this.game.soundFxIndex.playerDestroyed, 5);
                projectileMngr.eraseAllProjectiles();
                break;
            }
        }
    }
    checkHumanCollisions(player, enemies, humans, scoreMngr, soundMngr) {
        this.checkHumanPlayerCollision(humans, player, scoreMngr, soundMngr);
        this.checkHumanEnemyCollision(humans, enemies, soundMngr);
    }
    checkHumanPlayerCollision(humans, player, scoreMngr, soundMngr) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human)) {
                human.wasRescued = true;
                scoreMngr.awardRecuePoints(human);
                soundMngr.playSound(this.game.soundFxIndex.humanRescued, 4, 0.5);
                break;
            }
        }
    }
    checkHumanEnemyCollision(humans, enemies, soundMngr) {
        for (const enemy of enemies) {
            // Destroys humans when colliding with Hulks
            if (enemy.isHulk) {
                for (const human of humans) {
                    if (this.checkSingleCollision(human, enemy)) {
                        human.isAlive = false;
                        soundMngr.playSound(this.game.soundFxIndex.humanDestroyed, 4, 0.48);
                        break;
                    }
                }
            }
        }
    }
    // Checks collision between all projectiles and enemies
    checkProjectileCollisions(projectiles, enemies) {
        for (const projectile of projectiles) {
            for (const enemy of enemies) {
                if (this.checkSingleCollision(projectile, enemy)) {
                    // Destroys enemies that are not Hulks
                    if (!enemy.isHulk) {
                        enemy.isAlive = false;
                        this.game.scoreMngr.awardEnemyPoints(enemy);
                        this.game.soundMngr.playSound(this.game.soundFxIndex.enemyDestroyed, 3, 0.035);
                    } else {
                        this.knockbackHulk(projectile, enemy);
                    }
                    projectile.shouldDelete = true;
                    break;
                }
            }
        }
    }
    knockbackHulk(projectile, hulk) {
        const {shotRight = false, shotLeft = false, shotDown = false, shotUp = false, knockbackForce} = projectile;
        const knockbackXDirection = shotRight ? 1 : (shotLeft ? -1 : 0);
        const knockbackYDirection = shotDown ? 1 : (shotUp ? -1 : 0);
        hulk.screenX += knockbackXDirection * knockbackForce;
        hulk.screenY += knockbackYDirection * knockbackForce;
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
}
