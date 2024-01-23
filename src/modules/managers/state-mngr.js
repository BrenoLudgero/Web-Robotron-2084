export {StateManager};
import {isActorOfType} from "../helpers/globals.js";

class StateManager {
    constructor(game) {
        this.game = game;
        this.score = game.score;
        this.soundMngr = game.soundMngr;
        this.projectileMngr = game.projectileMngr;
        this.actors = game.actorMngr.actors;
        this.projectiles = game.projectileMngr.projectiles;
        this.player = this.actors.player;
    }
    update() {
        this.handleAllStates();
    }
    actorDestroyed(actor) {
        return actor.currentState === "destroyed";
    }
    handlePlayerDestroyed() {
        if (this.actorDestroyed(this.player)) {
            this.player.lives--;
            this.score.resetRescueBonus();
            const soundPriority = 6;
            this.soundMngr.playSound("playerDestroyed", soundPriority);
            this.projectileMngr.eraseAllPlayerProjectiles();
        }
    }
    handleHumanDestroyed(human) {
        if (this.actorDestroyed(human)) {
            this.actors.humans.delete(human);
            const soundPriority = 4;
            const minDuration = 0.36;
            this.soundMngr.playSound("humanDestroyed", soundPriority, minDuration);
        }
    }
    humanWasRecued(human) {
        return human.currentState === "rescued";
    }
    handleHumanRescued(human) {
        if (this.humanWasRecued(human)) {
            this.score.awardRecuePoints(human);
            this.actors.humans.delete(human);
            const soundPriority = 4;
            const minDuration = 0.4;
            this.soundMngr.playSound("humanRescued", soundPriority, minDuration);
        }
    }
    handleHumanStates() {
        for (const human of this.actors.humans) {
            this.handleHumanDestroyed(human);
            this.handleHumanRescued(human);
        }
    }
    handleEnemyDestroyed(enemy) {
        if (this.actorDestroyed(enemy)) {
            this.score.awardPoints(enemy);
            this.actors.enemies.delete(enemy);
            let soundPriority = 3
            const minDuration = 0.086;
            if (!isActorOfType(enemy, "Spheroid")) {
                this.soundMngr.playSound("enemyDestroyed", soundPriority, minDuration);
                return
            }
            soundPriority = 4;
            this.soundMngr.playSound("spheroidDestroyed", soundPriority, minDuration);
        }
    }
    enemyIsSpawner(enemy) {
        return (
            isActorOfType(enemy, "Spheroid")
            || isActorOfType(enemy, "Quark")
        );
    }
    spawnerSpawning(enemy) {
        return enemy.currentState === "spawning";
    }
    handleSpawnerSpawning(enemy) {
        if (this.spawnerSpawning(enemy)) {
            enemy.startingSprite = 0;
            enemy.lastSprite = 8;
            enemy.animationDelay = 3;
            enemy.spawnEnemies();
        }
    }
    spawnerVanished(spawner) {
        return spawner.currentState === "vanished";
    }
    handleSpawnerVanishing(spawner) {
        if (this.spawnerVanished(spawner)) {
            spawner.fadeOut();
            if (spawner.currentSprite === spawner.lastSprite) {
                setTimeout(() => {
                    this.actors.enemies.delete(spawner);
                }, 80);
            }
        }
    }
    handleEnemyStates() {
        for (const enemy of this.actors.enemies) {
            this.handleEnemyDestroyed(enemy);
            if (this.enemyIsSpawner(enemy)) {
                this.handleSpawnerSpawning(enemy);
                this.handleSpawnerVanishing(enemy);
            }
        }
    }
    shouldDeleteProjectile(projectile) {
        return (
            projectile.currentState === "outOfBounds"
            || projectile.currentState === "destroyed"
        )
    }
    handleProjectileStates() {
        Object.values(this.projectiles).forEach((projectileSet) => {
            projectileSet.forEach((projectile) => {
                if (this.shouldDeleteProjectile(projectile)) {
                    projectileSet.delete(projectile);
                    if (projectile.points) {
                        this.game.score.awardPoints(projectile);
                    }
                }
                else {
                    projectile.update(this.game);
                }
            });
        });
    }
    handleAllStates() {
        this.handlePlayerDestroyed();
        this.handleHumanStates();
        this.handleEnemyStates();
        this.handleProjectileStates();
    }
}
