export {Projectile}

class Projectile {
    constructor(game, screenXPosition, screenYPosition, left, right, up, down) {
        this.game = game;
        this.width = 2;
        this.height = 2;
        this.spritesheetXPosition = 0;
        this.spritesheetYPosition = 510;
        this.screenXPosition = screenXPosition;
        this.screenYPosition = screenYPosition;
        this.shotLeft = left;
        this.shotRight = right;
        this.shotUp = up;
        this.shotDown = down;
        this.shouldDelete = false
    };
    update() {
        if (this.screenXPosition > this.game.canvas.width + 10 || this.screenXPosition < -10 || this.screenYPosition > this.game.canvas.height + 10 || this.screenYPosition < -10) {
            this.shouldDelete = true
        }
    };
    draw(context) {
        if (this.shotUp && !this.shotLeft && !this.shotRight) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotUp && this.shotLeft) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotUp && this.shotRight) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition --, this.width, this.height)
            }
        } else if (this.shotLeft && !this.shotUp && !this.shotDown) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition, this.width, this.height)
            }
        } else if (this.shotRight && !this.shotUp && !this.shotDown) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition, this.width, this.height)
            }
        } else if (this.shotDown && this.shotLeft) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition ++, this.width, this.height)
            }
        } else if (this.shotDown && !this.shotLeft && !this.shotRight) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition ++, this.width, this.height)
            }
        } else if (this.shotDown && this.shotRight) {
            for (let i = 0; i < 18; i ++) {
                context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition ++, this.width, this.height)
            }
        }
    }
}
