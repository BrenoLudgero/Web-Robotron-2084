export {ProjectileManager};
import {PlayerProjectile} from "../projectiles/player-prjctl.js";
import {getActorName} from "../helpers/globals.js"

class ProjectileManager {
    constructor() {
        this.projectiles = {
            player: new Set(),
            enemies: new Set()
        };
    }
    update(game) {
        const {projectiles} = this;
        Object.values(projectiles).forEach((projectileSet) => {
            projectileSet.forEach((projectile) => {
                projectile.update(game);
                if (projectile.mustDelete) {
                    projectileSet.delete(projectile);
                }
            });
        });
    }
    draw(game, context) { // REMOVE GAME WITH DEBUGGER
        const {projectiles} = this;
        Object.values(projectiles).forEach((projectileSet) => {
            projectileSet.forEach((projectile) => {
                projectile.draw(game, context);
            });
        });
    }
    createProjectile(actor, screenX, screenY, speed, direction) {
        let projectile;
        const actorName = getActorName(actor);
        switch (actorName) {
            case "player":
                projectile = new PlayerProjectile(actor.projectileSprite, screenX, screenY, speed, direction);
                this.projectiles.player.add(projectile);
                break;
        }
        return projectile;
    }
    eraseAllPlayerProjectiles() {
        this.projectiles.player.clear();
    }
}
