export {Actor};

class Actor {
    constructor(game) {
        this.game = game;
        this.width;
        this.adjustedWidth;
        this.height;
        this.adjustedHeight;
        this.spritesheetXPosition;
        this.spritesheetYPosition;
        this.screenXPosition;
        this.screenYPosition;
        this.movementSpeed;
        this.movementAnimationDelay;
        this.movementType; // 0: Stationary, 1: 4-way movement, 2: 8-way movement
        this.projectiles = [];
        this.projectileTimer;
        this.projectileDelay;
        this.isAlive = true;
        this.movementBoundaries
    };
    draw(context) {
        context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
        this.projectiles.forEach(projectile => projectile.draw(context));
        this.game.drawHitboxes(this)
    }
}
