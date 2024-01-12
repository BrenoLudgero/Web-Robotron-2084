export {ProjectileManager};
import {Projectile} from "../models/projectile.js";

class ProjectileManager {
    constructor() {
        this.projectiles = new Set();
    }
    update(game) {
        const {projectiles} = this;
        projectiles.forEach(projectile => {
            projectile.update(game);
            if (projectile.shouldDelete) {
                projectiles.delete(projectile);
            }
        });
    }
    draw(game, context) { // REMOVE GAME WITH DEBUGGER
        this.projectiles.forEach(projectile => projectile.draw(game, context));
    }
    createProjectile(spriteSrc, screenX, screenY, speed, left, right, up, down) {
        const projectile = new Projectile(spriteSrc, screenX, screenY, speed, left, right, up, down);
        this.projectiles.add(projectile);
    }
    eraseAllProjectiles() {
        this.projectiles.clear();
    }
}
