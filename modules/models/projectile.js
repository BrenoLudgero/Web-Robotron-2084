export {Projectile};

class Projectile { // Initialized in Player.shoot()
    constructor(game, screenXPosition, screenYPosition, speed, left, right, up, down) {
        this.game = game;
        this.width = 3;
        this.height = 20;
        this.sprite = new Image();
        this.sprite.src = "../images/projectile.png";
        this.spritesheetXPosition = 0;
        this.spritesheetYPosition = 0;
        this.screenXPosition = screenXPosition;
        this.screenYPosition = screenYPosition;
        this.shotLeft = left;
        this.shotRight = right;
        this.shotUp = up;
        this.shotDown = down;
        this.speed = speed;
        this.rotation = 0; // Rotates the sprite depending on the shot direction
        this.knockbackForce = 6; // For Hulk collision
        this.shouldDelete = false
    };
    update() {
        this.shootProjectile()
        if (this.isOutOfBounds()) {
            this.shouldDelete = true // Deleted in Player.update()
        }
    };
    draw(context) {
        const {width, height, game} = this;
        context.save();
        context.translate(this.screenXPosition + (width / 2), this.screenYPosition + (height / 2));
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
            this.screenXPosition > canvas.width + 10 
            || this.screenXPosition < -10 
            || this.screenYPosition > canvas.height + 10 
            || this.screenYPosition < -10
        )
    };
    shootUp() {
        this.rotation = 0;
        this.screenYPosition -= this.speed
    };
    shootUpLeft() {
        this.rotation = -Math.PI / 4;
        this.screenXPosition -= this.speed;
        this.screenYPosition -= this.speed
    };
    shootUpRight() {
        this.rotation = Math.PI / 4;
        this.screenXPosition += this.speed;
        this.screenYPosition -= this.speed
    };
    shootLeft() {
        this.rotation = Math.PI / 2;
        this.screenXPosition -= this.speed
    };
    shootRight() {
        this.rotation = Math.PI / 2;
        this.screenXPosition += this.speed
    };
    shootDownLeft() {
        this.rotation = 3 * (-Math.PI / 4);
        this.screenXPosition -= this.speed;
        this.screenYPosition += this.speed
    };
    shootDown() {
        this.rotation = 0;
        this.screenYPosition += this.speed
    };
    shootDownRight() {
        this.rotation = 3 * (Math.PI / 4);
        this.screenXPosition += this.speed;
        this.screenYPosition += this.speed
    }
}
