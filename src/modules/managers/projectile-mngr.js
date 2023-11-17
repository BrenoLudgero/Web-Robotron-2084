export {ProjectileManager};
import {Projectile} from "../models/projectile.js";

class ProjectileManager {
    constructor(game) {
        this.game = game;
        this.projectiles = [];
    };
    update() {
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete)
    };
    draw(context) {
        this.projectiles.forEach(projectile => projectile.draw(context))
    };
    createProjectile(screenX, screenY, speed, left, right, up, down) {
        const projectile = new Projectile(this.game, screenX, screenY, speed, left, right, up, down);
        this.projectiles.push(projectile)
    }
}
