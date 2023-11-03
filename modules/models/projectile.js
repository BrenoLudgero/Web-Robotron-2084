export {Projectile};

class Projectile {
    constructor(game, screenXPosition, screenYPosition, size, speed, left, right, up, down) {
        this.game = game;
        this.width = 14;
        this.height = 14;
        this.spritesheetXPosition = 0;
        this.spritesheetYPosition = 510;
        this.screenXPosition = screenXPosition;
        this.screenYPosition = screenYPosition;
        this.shotLeft = left;
        this.shotRight = right;
        this.shotUp = up;
        this.shotDown = down;
        this.speed = speed;
        this.size = size;
        this.shouldDelete = false
    };
    update() {
        if (this.screenXPosition > this.game.canvas.width + 10 || this.screenXPosition < -10 || this.screenYPosition > this.game.canvas.height + 10 || this.screenYPosition < -10) {
            this.shouldDelete = true
        };
        if (this.shotUp && !this.shotLeft && !this.shotRight) {
            this.shootUp();
        } else if (this.shotUp && this.shotLeft) {
            this.shootUpLeft();
        } else if (this.shotUp && this.shotRight) {
            this.shootUpRight();
        } else if (this.shotLeft && !this.shotUp && !this.shotDown) {
            this.shootLeft();
        } else if (this.shotRight && !this.shotUp && !this.shotDown) {
            this.shootRight();
        } else if (this.shotDown && this.shotLeft) {
            this.shootDownLeft();
        } else if (this.shotDown && !this.shotLeft && !this.shotRight) {
            this.shootDown();
        } else if (this.shotDown && this.shotRight) {
            this.shootDownRight();
        }
    };
    draw(context) {
        if (this.shotUp && !this.shotLeft && !this.shotRight) {
            for (let i = 0; i < this.size + 5; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotUp && this.shotLeft) {
            for (let i = 0; i < this.size; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotUp && this.shotRight) {
            for (let i = 0; i < this.size; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotLeft && !this.shotUp && !this.shotDown) {
            for (let i = 0; i < this.size + 5; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition, this.width, this.height)
            }
        } else if (this.shotRight && !this.shotUp && !this.shotDown) {
            for (let i = 0; i < this.size + 5; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition, this.width, this.height)
            }
        } else if (this.shotDown && this.shotLeft) {
            for (let i = 0; i < this.size; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition ++, this.width, this.height)
            }
        } else if (this.shotDown && !this.shotLeft && !this.shotRight) {
            for (let i = 0; i < this.size + 5; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition ++, this.width, this.height)
            }
        } else if (this.shotDown && this.shotRight) {
            for (let i = 0; i < this.size; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition ++, this.width, this.height)
            }
        }
    };
    shootUp() {
        for (let i = 0; i < this.size; i++) {
            this.screenYPosition -= this.speed
        }
    };
    shootUpLeft() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition -= this.speed;
            this.screenYPosition -= this.speed
        }
    };
    shootUpRight() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition += this.speed;
            this.screenYPosition -= this.speed
        }
    };
    shootLeft() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition -= this.speed
        }
    };
    shootRight() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition += this.speed
        }
    };
    shootDownLeft() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition -= this.speed;
            this.screenYPosition += this.speed
        }
    };
    shootDown() {
        for (let i = 0; i < this.size; i++) {
            this.screenYPosition += this.speed
        }
    };
    shootDownRight() {
        for (let i = 0; i < this.size; i++) {
            this.screenXPosition += this.speed;
            this.screenYPosition += this.speed
        }
    }
}
