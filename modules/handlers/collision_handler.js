export {CollisionHandler};

class CollisionHandler {
    constructor(game) {
        this.game = game
    };
    update() {
        const {enemies, player, humans, actorInvincibility} = this.game;
        if (!actorInvincibility) {  //  !  !  !  !  !
            this.checkAllCollisions(enemies, player, humans)
        }
    };
    checkAllCollisions(enemies, player, humans) {
        enemies.forEach((enemy) => {
            this.checkPlayerEnemyCollision(player, enemy);
            player.projectiles.forEach((projectile) => {
                this.checkProjectileEnemyCollision(projectile, enemy);
            });
            humans.forEach((human) => {
                this.checkHumanEnemyCollision(human, enemy);
                this.checkPlayerHumanCollision(player, human)
            })
        })
    };
    checkSingleCollision(actorA, actorB) {
        return (
            actorA.screenXPosition <= actorB.screenXPosition + (actorB.width * 1.8) &&
            actorA.screenXPosition + (actorA.width * 1.8) >= actorB.screenXPosition &&
            actorA.screenYPosition <= actorB.screenYPosition + (actorB.height * 1.8) &&
            actorA.screenYPosition + (actorA.height * 1.8) >= actorB.screenYPosition
        )
    };
    checkPlayerEnemyCollision(player, enemy) {
        if (this.checkSingleCollision(player, enemy)) {
            player.isAlive = false
        }
    };
    checkPlayerHumanCollision(player, human) {
        if (this.checkSingleCollision(human, player)) {
            human.wasRescued = true
        }
    };
    checkHumanEnemyCollision(human, enemy) {
        if (this.checkSingleCollision(human, enemy)) {
            human.isAlive = false
        }
    };
    checkProjectileEnemyCollision(projectile, enemy) {
        if (this.checkSingleCollision(projectile, enemy)) {
            if (!enemy.isHulk) {
                enemy.isAlive = false
            } else {
                this.knockbackHulk(projectile, enemy)
            }
            projectile.shouldDelete = true
        }
    };
    knockbackHulk(projectile, enemy) {
        const knockbackXDirection = projectile.shotRight ? 1 : (projectile.shotLeft ? -1 : 0);
        const knockbackYDirection = projectile.shotDown ? 1 : (projectile.shotUp ? -1 : 0);
        enemy.screenXPosition += knockbackXDirection * enemy.knockbackForce;
        enemy.screenYPosition += knockbackYDirection * enemy.knockbackForce
    }
}
