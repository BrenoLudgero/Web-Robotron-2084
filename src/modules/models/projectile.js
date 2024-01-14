export {Projectile};

// Instantiated in projectileMngr
class Projectile {
    constructor(spriteSrc, screenX, screenY, speed, direction) {
        this.width = 3;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.screenX = screenX;
        this.screenY = screenY;
        this.direction = direction;
        this.speed = speed;
        this.angle = 0; // Rotation angle depending on the 'go' direction
        this.knockbackForce = 6; // For Hulk collision
        this.mustDelete = false;
        // Speed defined by each actor
    }
    update(game) {
        this.moveProjectile();
        if (this.outOfBounds(game)) {
            this.mustDelete = true;
        }
    }
    draw(game, context) { // REMOVE GAME WITH DEBUGGER
        const {width, height, screenX, screenY, angle, sprite} = this;
        context.save();
        context.translate(screenX + (width / 2), screenY + (height / 2));
        context.rotate(angle);
        context.drawImage(sprite, -width / 2, -height / 2);
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
    moveUp() {
        this.angle = 0;
        this.screenY -= this.speed;
    }
    moveUpLeft() {
        this.angle = -Math.PI / 4;
        this.screenX -= this.speed;
        this.screenY -= this.speed;
    }
    moveUpRight() {
        this.angle = Math.PI / 4;
        this.screenX += this.speed;
        this.screenY -= this.speed;
    }
    moveLeft() {
        this.angle = -Math.PI / 2;
        this.screenX -= this.speed;
    }
    moveRight() {
        this.angle = Math.PI / 2;
        this.screenX += this.speed;
    }
    moveDownLeft() {
        this.angle = 3 * (-Math.PI / 4);
        this.screenX -= this.speed;
        this.screenY += this.speed;
    }
    moveDown() {
        this.angle = 0;
        this.screenY += this.speed;
    }
    moveDownRight() {
        this.angle = 3 * (Math.PI / 4);
        this.screenX += this.speed;
        this.screenY += this.speed;
    }
    moveProjectile() {
        if (this.direction === "upleft") {
            this.moveUpLeft();
        } 
        else if (this.direction === "upright") {
            this.moveUpRight();
        } 
        else if (this.direction === "downleft") {
            this.moveDownLeft();
        } 
        else if (this.direction === "downright") {
            this.moveDownRight();
        } 
        else if (this.direction === "up") {
            this.moveUp();
        } 
        else if (this.direction === "down") {
            this.moveDown();
        } 
        else if (this.direction === "left") {
            this.moveLeft();
        } 
        else if (this.direction === "right") {
            this.moveRight();
        }
    }
}
