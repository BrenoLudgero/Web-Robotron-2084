export {Projectile};

class Projectile {
    constructor(game, screenXPosition, screenYPosition, length, speed, left, right, up, down) {
        this.game = game;
        this.width = 2;
        this.height = 2;
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
        this.length = length;
        this.shouldDelete = false
    };
    update() {
        if (this.isOutOfBounds()) {
            this.shouldDelete = true  // Deleted in Player.update()
        };
        this.setProjectileDirection()
    };
    draw(context) {
        switch (true) {
            case this.shotUp && !this.shotLeft && !this.shotRight:
                this.drawProjectile(context, 0, -1); break
            case this.shotUp && this.shotLeft:
                this.drawProjectile(context, -1, -1); break
            case this.shotUp && this.shotRight:
                this.drawProjectile(context, 1, -1); break
            case this.shotLeft && !this.shotUp && !this.shotDown:
                this.drawProjectile(context, -1, 0); break
            case this.shotRight && !this.shotUp && !this.shotDown:
                this.drawProjectile(context, 1, 0); break
            case this.shotDown && this.shotLeft:
                this.drawProjectile(context, -1, 1); break
            case this.shotDown && !this.shotLeft && !this.shotRight:
                this.drawProjectile(context, 0, 1); break
            case this.shotDown && this.shotRight:
                this.drawProjectile(context, 1, 1); break
        }
    };
    setProjectileDirection() {
        const directions = ["Up", "Down", "Left", "Right"];
        for (const dir of directions) {
            if (this[`shot${dir}`]) {
                this[`shoot${dir}`]()
            }
        }
    };
    drawProjectile(context, xDirection, yDirection) {
        const {sprite, spritesheetXPosition, spritesheetYPosition, width, height} = this;
        for (let i = 0; i < this.length; i++) {
            context.drawImage(
                sprite,
                spritesheetXPosition,
                spritesheetYPosition,
                width,
                height,
                (this.screenXPosition += xDirection * this.speed),
                (this.screenYPosition += yDirection * this.speed),
                width,
                height
            )
        }
    };
    isOutOfBounds() {
        return this.screenXPosition > this.game.canvas.width + 10 || 
        this.screenXPosition < -10 || 
        this.screenYPosition > this.game.canvas.height + 10 || 
        this.screenYPosition < -10
    };
    shootUp() {
        for (let i = 0; i < this.length; i++) {
            this.screenYPosition -= this.speed
        }
    };
    shootUpLeft() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition -= this.speed;
            this.screenYPosition -= this.speed
        }
    };
    shootUpRight() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition += this.speed;
            this.screenYPosition -= this.speed
        }
    };
    shootLeft() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition -= this.speed
        }
    };
    shootRight() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition += this.speed
        }
    };
    shootDownLeft() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition -= this.speed;
            this.screenYPosition += this.speed
        }
    };
    shootDown() {
        for (let i = 0; i < this.length; i++) {
            this.screenYPosition += this.speed
        }
    };
    shootDownRight() {
        for (let i = 0; i < this.length; i++) {
            this.screenXPosition += this.speed;
            this.screenYPosition += this.speed
        }
    }
}
