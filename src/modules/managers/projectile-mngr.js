export {ProjectileManager};
import {Projectile} from "../models/projectile.js";

class ProjectileManager {
    constructor(game) {
        this.game = game;
        this.projectiles = new Set();
    }
    update() {
        this.projectiles.forEach(projectile => {
            projectile.update();
            if (projectile.shouldDelete) {
                this.projectiles.delete(projectile);
            }
        });
    }
    draw(context) {
        this.projectiles.forEach(projectile => projectile.draw(context));
    }
    createProjectile(spriteSrc, screenX, screenY, speed, left, right, up, down) {
        const projectile = new Projectile(this.game, spriteSrc, screenX, screenY, speed, left, right, up, down);
        this.projectiles.add(projectile);
    }
}
