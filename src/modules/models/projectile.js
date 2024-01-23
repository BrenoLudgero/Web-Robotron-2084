export {Projectile};

// Instantiated in projectileMngr
class Projectile {
    constructor(sprite, screenX, screenY, speed) {
        this.sprite = sprite;
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.screenX = screenX;
        this.screenY = screenY;
        this.speed = speed;
        this.angle = 0;
        this.mustDelete = false;
        // Speed defined by each actor
    }
    update(game) {
        this.moveProjectile(game);
        if (this.outOfBounds(game.ui)) {
            this.mustDelete = true;
        }
    }
    draw(game, context) { // REMOVE GAME WITH DEBUGGER
        const {width, height, screenX, screenY, angle} = this;
        context.save();
        context.translate(screenX + (width / 2), screenY + (height / 2));
        context.rotate(angle);
        context.drawImage(this.sprite, -width / 2, -height / 2);
        context.restore();
        game.debuggerr.drawHitboxes(this, context);
    }
    outOfBounds(ui) {
        const {screenX, screenY} = this;
        return (
            screenX > ui.canvas.width + 10 
            || screenX < -10 
            || screenY > ui.canvas.height + 10 
            || screenY < -10
        );
    }
}
