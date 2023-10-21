export {InputHandler}

class InputHandler {
    constructor(game) {
        this.game = game;
        this.playerControls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
        window.addEventListener("keydown", (e) => {
            if (this.playerControls.includes(e.key) && this.game.keysPressed.indexOf(e.key) === -1) {
                this.game.keysPressed.push(e.key)
            }
        });
        window.addEventListener("keyup", (e) => {
            if (this.game.keysPressed.indexOf(e.key) > -1) {
                this.game.keysPressed.splice(this.game.keysPressed.indexOf(e.key), 1)
            };
            if (e.key == "h") {
                game.shouldDrawHitboxes = !game.shouldDrawHitboxes
            };
            if (e.key == "i") {  //  !  !  !  !  !
                game.collision.everyoneInvincible = !game.collision.everyoneInvincible,
                console.log("INVINCIBILITY: " + game.collision.everyoneInvincible)
            }
        })
        /*; window.addEventListener("mousedown", e => {
            console.log("CLICK")
        });
        window.addEventListener("mouseup", e => {
            console.log("NO CLICK")
        }) */
    };
    update() {
        if (this.game.keysPressed.includes("w")) {
            this.game.player.move(false, true)
        };
        if (this.game.keysPressed.includes("s")) {
            this.game.player.move(false, false)
        };
        if (this.game.keysPressed.includes("d")) {
            this.game.player.move(true, true)
        } else if (this.game.keysPressed.includes("a")) {
            this.game.player.move(true, false)
        };
        if (this.game.keysPressed.includes("ArrowUp") && !this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowRight")) {
            this.game.player.shoot(this.game.player.screenXPosition + this.game.player.adjustedWidth / 2, this.game.player.screenYPosition - 4, false, false, true, false)
        } else if (this.game.keysPressed.includes("ArrowUp") && this.game.keysPressed.includes("ArrowLeft")) {
            this.game.player.shoot(this.game.player.screenXPosition - 4, this.game.player.screenYPosition - 4, true, false, true, false)
        } else if (this.game.keysPressed.includes("ArrowUp") && this.game.keysPressed.includes("ArrowRight")) {
            this.game.player.shoot(this.game.player.screenXPosition + this.game.player.adjustedWidth + 4, this.game.player.screenYPosition - 4, false, true, true, false)
        };
        if (this.game.keysPressed.includes("ArrowDown") && !this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowRight")) {
            this.game.player.shoot(this.game.player.screenXPosition + this.game.player.adjustedWidth / 2, this.game.player.screenYPosition + this.game.player.adjustedHeight, false, false, false, true)
        } else if (this.game.keysPressed.includes("ArrowDown") && this.game.keysPressed.includes("ArrowRight")) {
            this.game.player.shoot(this.game.player.screenXPosition  + this.game.player.adjustedWidth + 3, this.game.player.screenYPosition + this.game.player.adjustedHeight, false, true, false, true)
        } else if (this.game.keysPressed.includes("ArrowDown") && this.game.keysPressed.includes("ArrowLeft")) {
            this.game.player.shoot(this.game.player.screenXPosition - 4, this.game.player.screenYPosition + this.game.player.adjustedHeight, true, false, false, true)
        };
        if (this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowDown")  && !this.game.keysPressed.includes("ArrowUp")) {
            this.game.player.shoot(this.game.player.screenXPosition - 4, this.game.player.screenYPosition + this.game.player.adjustedHeight / 2, true, false, false, false)
        } else if (this.game.keysPressed.includes("ArrowRight") && !this.game.keysPressed.includes("ArrowDown")  && !this.game.keysPressed.includes("ArrowUp")) {
            this.game.player.shoot(this.game.player.screenXPosition + this.game.player.adjustedWidth + 3, this.game.player.screenYPosition + this.game.player.adjustedHeight / 2, false, true, false, false)
        }
    }
}
