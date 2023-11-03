export {CollisionHandler};

class CollisionHandler {
    constructor(game) {
        this.game = game;
        this.everyoneInvincible = false;  //  !  !  !  !  !
        this.checkCollision = function (actorA, widthActorA, heightActorA, actorB, widthActorB, heightActorB) {
            return (
                actorA.screenXPosition <= actorB.screenXPosition + widthActorB &&
                actorA.screenXPosition + widthActorA >= actorB.screenXPosition &&
                actorA.screenYPosition <= actorB.screenYPosition + heightActorB &&
                actorA.screenYPosition + heightActorA >= actorB.screenYPosition
            )
        }
    };
    update() {
        this.game.enemies.forEach (enemy => {
            this.game.player.projectiles.forEach(projectile => {
                if (this.checkCollision(projectile, projectile.width, projectile.height, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                    if (!enemy.isHulk) {
                        if (!this.everyoneInvincible) {  //  !  !  !  !  !
                        enemy.isAlive = false
                        }
                    } else {
                        // Calculate knockback direction based on projectile direction
                        const knockbackXDirection = projectile.shotRight ? 1 : (projectile.shotLeft ? -1 : 0);
                        const knockbackYDirection = projectile.shotDown ? 1 : (projectile.shotUp ? -1 : 0);
                        // Apply knockback
                        enemy.screenXPosition += knockbackXDirection * 6;
                        enemy.screenYPosition += knockbackYDirection * 6
                    };
                    projectile.shouldDelete = true;
                }
            });
            if (!this.everyoneInvincible) {  //  !  !  !  !  !
                if (this.checkCollision(this.game.player, this.game.player.adjustedWidth, this.game.player.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                    this.game.player.isAlive = false
                }
                this.game.humans.forEach (human => {
                    if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        human.isAlive = false
                    }
                })
            }
        });
        this.game.humans.forEach (human => {
            if (!this.everyoneInvincible) {  //  !  !  !  !  !
                if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, this.game.player, this.game.player.adjustedWidth, this.game.player.adjustedHeight)) {
                    human.wasRescued = true
                }
            }
        })
    }
}
