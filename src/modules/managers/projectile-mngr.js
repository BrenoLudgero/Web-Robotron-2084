export {ProjectileManager};
import {PlayerProjectile} from "../projectiles/player-prjctl.js";

class ProjectileManager {
    constructor() {
        this.projectiles = new Set();
    }
    update(game) {
        const {projectiles} = this;
        projectiles.forEach(projectile => {
            projectile.update(game.ui);
            if (projectile.mustDelete) {
                projectiles.delete(projectile);
            }
        });
    }
    draw(game, context) { // REMOVE GAME WITH DEBUGGER
        this.projectiles.forEach(projectile => projectile.draw(game, context));
    }
    createPlayerProjectile(spriteSrc, screenX, screenY, speed, direction) {
        const projectile = new PlayerProjectile(spriteSrc, screenX, screenY, speed, direction);
        this.projectiles.add(projectile);
    }
    eraseAllProjectiles() {
        this.projectiles.clear();
    }
}
