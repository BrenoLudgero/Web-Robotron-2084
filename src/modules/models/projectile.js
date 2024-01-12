export {Projectile};

// Instantiated in projectileMngr
class Projectile {
    constructor(spriteSrc, screenX, screenY, speed, left, right, up, down) {
        this.width = 3;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.screenX = screenX;
        this.screenY = screenY;
        this.goLeft = left;
        this.goRight = right;
        this.goUp = up;
        this.goDown = down;
        this.speed = speed;
        this.angle = 0; // Rotation angle depending on the 'go' direction
        this.knockbackForce = 6; // For Hulk collision
        this.shouldDelete = false;
        // Speed defined by each actor
    }
    update(game) {
        const {goUp, goDown, goLeft, goRight, screenX, screenY} = this;
        this.moveProjectile(goUp, goDown, goLeft, goRight);
        if (this.isOutOfBounds(game, screenX, screenY)) {
            this.shouldDelete = true;
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
    isOutOfBounds(game, screenX, screenY) {
        const ui = game.ui;
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
    moveProjectile(goUp, goDown, goLeft, goRight) {
        if (goUp && goLeft) {
            this.moveUpLeft();
        } 
        else if (goUp && goRight) {
            this.moveUpRight();
        } 
        else if (goDown && goLeft) {
            this.moveDownLeft();
        } 
        else if (goDown && goRight) {
            this.moveDownRight();
        } 
        else if (goUp) {
            this.moveUp();
        } 
        else if (goDown) {
            this.moveDown();
        } 
        else if (goLeft) {
            this.moveLeft();
        } 
        else if (goRight) {
            this.moveRight();
        }
    }
}
