export {CollisionManager};

class CollisionManager {
    constructor(game) {
        this.game = game
    };
    update() {
        const {enemies, player, humans, debuggerr} = this.game;
        if (!debuggerr.actorInvincibility) {
            this.checkAllCollisions(player, enemies, humans)
        }
    };
    checkAllCollisions(player, enemies, humans) {
        this.checkPlayerCollisions(player, enemies);
        this.checkHumanCollisions(player, enemies, humans);
        this.checkProjectileCollisions(this.game.projectileMngr.projectiles, enemies)
    };
    checkSingleCollision(actorA, actorB) { // Projectile shall always be actorA
        const actorBHitbox = this.getHitbox(actorB);
        if (actorA.angle !== undefined) { // Projectiles only
            const actorARotatedHitbox = this.getRotatedHitbox(actorA);
            return (
                actorARotatedHitbox.right >= actorBHitbox.left 
                && actorARotatedHitbox.left <= actorBHitbox.right 
                && actorARotatedHitbox.bottom >= actorBHitbox.top 
                && actorARotatedHitbox.top <= actorBHitbox.bottom
            )
        };
        const actorAHitbox = this.getHitbox(actorA)
        return (
            actorAHitbox.right >= actorBHitbox.left 
            && actorAHitbox.left <= actorBHitbox.right 
            && actorAHitbox.bottom >= actorBHitbox.top 
            && actorAHitbox.top <= actorBHitbox.bottom
        )
    };
    getHitbox(actor) {
        return {
            left: actor.screenX,
            right: actor.screenX + actor.width,
            top: actor.screenY,
            bottom: actor.screenY + actor.height
        }
    };
    getRotatedHitbox(projectile) {
        const halfWidth = projectile.width / 2;
        const halfHeight = projectile.height / 2;
        const centerX = projectile.screenX + halfWidth;
        const centerY = projectile.screenY + halfHeight;
        const rotatedX1 = centerX - halfWidth * Math.abs(Math.cos(projectile.angle)) - halfHeight * Math.abs(Math.sin(projectile.angle));
        const rotatedX2 = centerX + halfWidth * Math.abs(Math.cos(projectile.angle)) + halfHeight * Math.abs(Math.sin(projectile.angle));
        const rotatedY1 = centerY - halfWidth * Math.abs(Math.sin(projectile.angle)) - halfHeight * Math.abs(Math.cos(projectile.angle));
        const rotatedY2 = centerY + halfWidth * Math.abs(Math.sin(projectile.angle)) + halfHeight * Math.abs(Math.cos(projectile.angle));
        return {
            left: Math.min(rotatedX1, rotatedX2),
            right: Math.max(rotatedX1, rotatedX2),
            top: Math.min(rotatedY1, rotatedY2),
            bottom: Math.max(rotatedY1, rotatedY2)
        }
    };
    checkPlayerCollisions(player, enemies) {
        for (const enemy of enemies) {
            if (this.checkSingleCollision(player, enemy)) {
                player.isAlive = false;
                player.lives--;
                break
            }
        }
    };
    checkHumanCollisions(player, enemies, humans) {
        for (const human of humans) {
            if (this.checkSingleCollision(player, human)) {
                human.wasRescued = true;
                this.game.score += human.points;
                break
            }
        };
        for (const enemy of enemies) {
            if (enemy.isHulk) {
                for (const human of humans) {
                    if (this.checkSingleCollision(human, enemy)) {
                        human.isAlive = false;
                        break
                    }
                }
            }
        }
    };
    checkProjectileCollisions(projectiles, enemies) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                if (this.checkSingleCollision(projectile, enemy)) {
                    if (!enemy.isHulk) {
                        enemy.isAlive = false;
                        this.game.score += enemy.points;
                    } else {
                        this.knockbackHulk(projectile, enemy)
                    }
                    projectile.shouldDelete = true;
                    break
                }
            }
        }
    };
    knockbackHulk(projectile, enemy) {
        const knockbackXDirection = projectile.shotRight ? 1 : (projectile.shotLeft ? -1 : 0);
        const knockbackYDirection = projectile.shotDown ? 1 : (projectile.shotUp ? -1 : 0);
        enemy.screenX += knockbackXDirection * projectile.knockbackForce;
        enemy.screenY += knockbackYDirection * projectile.knockbackForce
    }
}
