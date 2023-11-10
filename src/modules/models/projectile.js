export {Projectile};

class Projectile { // Initialized by each actor.shoot()
    constructor(game, screenX, screenY, speed, left, right, up, down) {
        this.game = game;
        this.width = 3;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = game.spritesIndex.projectile;
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.screenX = screenX;
        this.screenY = screenY;
        this.shotLeft = left;
        this.shotRight = right;
        this.shotUp = up;
        this.shotDown = down;
        this.speed = speed;
        this.rotation = 0; // Rotates the sprite depending on the shot direction
        this.knockbackForce = 6; // For Hulk collision
        this.shouldDelete = false
        // Speed defined by each actor
    };
    update() {
        this.shootProjectile()
        if (this.isOutOfBounds()) {
            this.shouldDelete = true
        }
    };
    draw(context) {
        const {width, height, game} = this;
        context.save();
        context.translate(this.screenX + (width / 2), this.screenY + (height / 2));
        context.rotate(this.rotation);
        context.drawImage(this.sprite, -width / 2, -height / 2, width, height);
        context.restore();
        game.debuggerr.drawHitboxes(this, context)
    };
    shootProjectile() {
        if (this.shotUp && this.shotLeft) {
            this.shootUpLeft()
        } else if (this.shotUp && this.shotRight) {
            this.shootUpRight()
        } else if (this.shotDown && this.shotLeft) {
            this.shootDownLeft()
        } else if (this.shotDown && this.shotRight) {
            this.shootDownRight()
        } else if (this.shotUp) {
            this.shootUp()
        } else if (this.shotDown) {
            this.shootDown()
        } else if (this.shotLeft) {
            this.shootLeft()
        } else if (this.shotRight) {
            this.shootRight()
        }
    };
    isOutOfBounds() {
        const {canvas} = this.game;
        return (
            this.screenX > canvas.width + 10 
            || this.screenX < -10 
            || this.screenY > canvas.height + 10 
            || this.screenY < -10
        )
    };
    shootUp() {
        this.rotation = 0;
        this.screenY -= this.speed
    };
    shootUpLeft() {
        this.rotation = -Math.PI / 4;
        this.screenX -= this.speed;
        this.screenY -= this.speed
    };
    shootUpRight() {
        this.rotation = Math.PI / 4;
        this.screenX += this.speed;
        this.screenY -= this.speed
    };
    shootLeft() {
        this.rotation = Math.PI / 2;
        this.screenX -= this.speed
    };
    shootRight() {
        this.rotation = Math.PI / 2;
        this.screenX += this.speed
    };
    shootDownLeft() {
        this.rotation = 3 * (-Math.PI / 4);
        this.screenX -= this.speed;
        this.screenY += this.speed
    };
    shootDown() {
        this.rotation = 0;
        this.screenY += this.speed
    };
    shootDownRight() {
        this.rotation = 3 * (Math.PI / 4);
        this.screenX += this.speed;
        this.screenY += this.speed
    }
}
