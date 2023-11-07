export {CollisionHandler};

class CollisionHandler {
    constructor(game) {
        this.game = game
    };
    update() {
        const {enemies, player, humans, actorInvincibility} = this.game;
        if (!actorInvincibility) { //  !  !  !  !  !
            this.checkAllCollisions(player, enemies, humans)
        }
    };
    checkAllCollisions(player, enemies, humans) {
        this.checkPlayerCollisions(player, enemies);
        this.checkHumanCollisions(player, enemies, humans);
        this.checkProjectileCollisions(player.projectiles, enemies)
    };
    checkSingleCollision(actorA, actorB) {
        const actorBHitbox = this.getHitbox(actorB);
        if (actorA.rotation !== undefined) { // Projectiles only
            const actorARotatedHitbox = this.getRotatedHitbox(actorA);
            return (
                actorARotatedHitbox.right >= actorBHitbox.left 
                && actorARotatedHitbox.left <= actorBHitbox.right 
                && actorARotatedHitbox.bottom >= actorBHitbox.top 
                && actorARotatedHitbox.top <= actorBHitbox.bottom
            )
        } else {
            const actorAHitbox = this.getHitbox(actorA)
            return (
                actorAHitbox.right >= actorBHitbox.left 
                && actorAHitbox.left <= actorBHitbox.right 
                && actorAHitbox.bottom >= actorBHitbox.top 
                && actorAHitbox.top <= actorBHitbox.bottom
            )
        }
    };
    getHitbox(actor) {
        return {
            left: actor.screenXPosition,
            right: actor.screenXPosition + actor.width,
            top: actor.screenYPosition,
            bottom: actor.screenYPosition + actor.height
        }
    };
    getRotatedHitbox(projectile) {
        const halfWidth = projectile.width / 2;
        const halfHeight = projectile.height / 2;
        const centerX = projectile.screenXPosition + halfWidth;
        const centerY = projectile.screenYPosition + halfHeight;
        const rotatedX1 = centerX - halfWidth * Math.abs(Math.cos(projectile.rotation)) - halfHeight * Math.abs(Math.sin(projectile.rotation));
        const rotatedX2 = centerX + halfWidth * Math.abs(Math.cos(projectile.rotation)) + halfHeight * Math.abs(Math.sin(projectile.rotation));
        const rotatedY1 = centerY - halfWidth * Math.abs(Math.sin(projectile.rotation)) - halfHeight * Math.abs(Math.cos(projectile.rotation));
        const rotatedY2 = centerY + halfWidth * Math.abs(Math.sin(projectile.rotation)) + halfHeight * Math.abs(Math.cos(projectile.rotation));
        return {
            left: Math.min(rotatedX1, rotatedX2),
            right: Math.max(rotatedX1, rotatedX2),
            top: Math.min(rotatedY1, rotatedY2),
            bottom: Math.max(rotatedY1, rotatedY2)
        }
    };
    checkPlayerCollisions(player, enemies) {
        enemies.forEach((enemy) => {
            if (this.checkSingleCollision(player, enemy)) {
                player.isAlive = false
            }
        })
    };
    checkHumanCollisions(player, enemies, humans) {
        humans.forEach((human) => {
            if (this.checkSingleCollision(player, human)) {
                human.wasRescued = true;
            };
            enemies.forEach((enemy) => {
                if (this.checkSingleCollision(human, enemy)) {
                    human.isAlive = false;
                    console.log("! HUMAN DIED !")
                }
            })
        })
    };
    checkProjectileCollisions(projectiles, enemies) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                if (this.checkSingleCollision(projectile, enemy)) {
                    if (!enemy.isHulk) {
                        enemy.isAlive = false
                    } else {
                        this.knockbackHulk(projectile, enemy);
                    }
                    projectile.shouldDelete = true
                }
            }
        }
    };
    knockbackHulk(projectile, enemy) {
        const knockbackXDirection = projectile.shotRight ? 1 : (projectile.shotLeft ? -1 : 0);
        const knockbackYDirection = projectile.shotDown ? 1 : (projectile.shotUp ? -1 : 0);
        enemy.screenXPosition += knockbackXDirection * projectile.knockbackForce;
        enemy.screenYPosition += knockbackYDirection * projectile.knockbackForce
    }
}
