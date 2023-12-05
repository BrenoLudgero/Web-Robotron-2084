export {Projectile};

// Instantiated in projectileMngr
class Projectile {
    constructor(game, spriteSrc, screenX, screenY, speed, left, right, up, down) {
        this.game = game;
        this.width = 3;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.screenX = screenX;
        this.screenY = screenY;
        this.shotLeft = left;
        this.shotRight = right;
        this.shotUp = up;
        this.shotDown = down;
        this.speed = speed;
        this.angle = 0; // Rotation angle depending on the shot direction
        this.knockbackForce = 6; // For Hulk collision
        this.shouldDelete = false;
        // Speed defined by each actor
    }
    update() {
        this.shootProjectile();
        if (this.isOutOfBounds()) {
            this.shouldDelete = true;
        }
    }
    draw(context) {
        const {width, height} = this;
        context.save();
        context.translate(this.screenX + (width / 2), this.screenY + (height / 2));
        context.rotate(this.angle);
        context.drawImage(this.sprite, -width / 2, -height / 2);
        context.restore();
        this.game.debuggerr.drawHitboxes(this, context);
    }
    shootProjectile() {
        if (this.shotUp && this.shotLeft) {
            this.shootUpLeft();
        } else if (this.shotUp && this.shotRight) {
            this.shootUpRight();
        } else if (this.shotDown && this.shotLeft) {
            this.shootDownLeft();
        } else if (this.shotDown && this.shotRight) {
            this.shootDownRight();
        } else if (this.shotUp) {
            this.shootUp();
        } else if (this.shotDown) {
            this.shootDown();
        } else if (this.shotLeft) {
            this.shootLeft();
        } else if (this.shotRight) {
            this.shootRight();
        }
    }
    isOutOfBounds() {
        return (
            this.screenX > this.game.uiMngr.canvas.width + 10 
            || this.screenX < -10 
            || this.screenY > this.game.uiMngr.canvas.height + 10 
            || this.screenY < -10
        );
    }
    shootUp() {
        this.angle = 0;
        this.screenY -= this.speed;
    }
    shootUpLeft() {
        this.angle = -Math.PI / 4;
        this.screenX -= this.speed;
        this.screenY -= this.speed;
    }
    shootUpRight() {
        this.angle = Math.PI / 4;
        this.screenX += this.speed;
        this.screenY -= this.speed;
    }
    shootLeft() {
        this.angle = -Math.PI / 2;
        this.screenX -= this.speed;
    }
    shootRight() {
        this.angle = Math.PI / 2;
        this.screenX += this.speed;
    }
    shootDownLeft() {
        this.angle = 3 * (-Math.PI / 4);
        this.screenX -= this.speed;
        this.screenY += this.speed;
    }
    shootDown() {
        this.angle = 0;
        this.screenY += this.speed;
    }
    shootDownRight() {
        this.angle = 3 * (Math.PI / 4);
        this.screenX += this.speed;
        this.screenY += this.speed;
    }
}
